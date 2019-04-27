import { Component, OnInit } from '@angular/core';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { XfdFxEntityEnum } from 'app/projects/xfd_fk/xfd_fk.EntityEnum';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { XFD_FKDbName } from 'app/projects/xfd_fk';
import { Order } from 'app/projects/xfd_fk/entity/Order';
import { CustomQueryToolbarComSpec } from 'app/libs/meta-ui/util/spec/custom/custom-query-toolbar';
import { ModeEnum } from 'app/libs/meta-ui/util/meta/Mode.enum';
import { QueryParam } from 'app/libs/meta-ui/util/stq/QueryParameter';
import { ISummary } from 'app/libs/meta-ui/util/meta/Summary';
import { MemberGroup } from 'app/projects/xfd_fk/entity/MemberGroup';
import { MetaCom } from 'app/libs/meta-ui/util/meta/MetaCom';
import { Member } from 'app/projects/xfd_fk/entity/Member';

@Component({
  selector: 'analyze-query-toolbar',
  templateUrl: './analyze-query-toolbar.component.html',
  styleUrls: ['./analyze-query-toolbar.component.css']
})
export class AnalyzeQueryToolbarComponent extends CustomQueryToolbarComSpec implements OnInit {
  dateFormat = 'yyyy/MM/dd';
  dateRange: [Date, Date] = [new Date(2018, 10, 10, 0, 0, 0), new Date(2018, 10, 11, 23, 59, 59)] as any;
  ModeEnum = ModeEnum;
  state: ModeEnum = ModeEnum.Query;
  selectedGroup = '';
  groupsOptions: { label: string, value: number }[] = []
  constructor(public valid: ValidService, private dataStrategy: IDataStrategy, public http: MyHttpService) { super() }

  ngOnInit() {
    this.loadGroupOptions();

  }

  async query(pageIndex = 0) {
    let param = new QueryParam();
    param.pageParam = { pageIndex, pageSize: 100 };
    if (this.selectedGroup) {
      param.queryConditions.push({ field: "groupId", compare: "=", value: this.selectedGroup, andOr: "and" });
    }
    if (this.dateRange.length > 1) {

      let members = await this.dataStrategy.entityQuery(this.metaCom, param);

      let memberIds = members.paging.rows.map((member: Member) => member.code);
      this.dateRange[0].setHours(0);
      this.dateRange[0].setMinutes(0);
      this.dateRange[0].setSeconds(0);
      this.dateRange[1].setHours(23);
      this.dateRange[1].setMinutes(59);
      this.dateRange[1].setSeconds(59);
      // param.queryConditions = [
      //   { field: "actTime", compare: ">", value: this.dateRange[0].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
      //   { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
      // ];

      let memberQuery = new QueryParam();
      memberQuery.pageParam = { pageIndex: 0, pageSize: 400, pageable: false, sortByAsc: true, "sortField": "" } as any;
      memberQuery.queryConditions = [
        { field: "actTime", compare: ">", value: this.dateRange[0].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "buyMerchCode", compare: "in", value: '(' + memberIds.map(code => `'${code}'`).join(',') + ')', andOr: "and" }

      ];

      let orders = await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.Order } as any, memberQuery);
      members.paging.rows.forEach((member: Member) => {
        let arr = orders.paging.rows
          .filter(order => order.buyMerchCode == member.code && order.orderType == "RECHARGE");
        if (arr.length > 0) {
          if (arr.length > 1) {

            member.recharge = arr.map(order => order.amount).reduce((amount1, amount2) => amount1 + amount2);
            if (!member.recharge) {
              debugger;
            }
          } else {
            member.recharge = arr[0].amount;
          }
        } else {
          debugger;
          member.recharge = 0;
        }
      });
      members.paging.rows.forEach((member: Member) => {
        let arr = orders.paging.rows
          .filter(order => order.buyMerchCode == member.code && order.orderType == "TRANS" && order.amount);
        if (arr.length > 0) {
          member.money = arr.map(order => order.amount).reduce((amount1, amount2) => amount1 + amount2);
        } else {
          member.money = 0;
        }
      });
      let summarys: ISummary[] = [];
      this.metaCom.metaFields.filter(field => field.summarys).forEach(field => summarys.push(...field.summarys))
      let summaryQuery = new QueryParam();
      summaryQuery.queryConditions = [
        { field: "actTime", compare: ">", value: this.dateRange[0].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },

      ];
      let summaryOrders = orders;  //= await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.Order } as any, summaryQuery);
      console.log(summaryOrders);
      let totalOrders: Order[] = summaryOrders.paging.rows;
      let rechargeOrders = totalOrders.filter(o => o.orderType == "RECHARGE");
      let transOrders = totalOrders.filter(o => o.orderType == "TRANS");
      console.log(rechargeOrders);
      this.queryResult.emit({
        rows: members.paging.rows,
        count: members.paging.count,
        summary: {
          money: transOrders.length > 0 ? transOrders.map(o => o.amount).reduce((m1, m2) => m1 + m2) : 0,
          recharge: this.getMoney(rechargeOrders)
        }
      });
    }
  }

  getMoney(orders: Order[]) {
    if (orders.length > 0) {
      if (orders.length > 1) {

        return orders.map(o => o.amount).reduce((m1, m2) => m1 + m2);
      } else {
        return orders[0].amount;
      }
    } else {
      return 0;
    }
  }

  async loadGroupOptions() {
    let groupsResult = await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.MemberGroup as any } as MetaCom, new QueryParam());
    this.groupsOptions = groupsResult.paging.rows.map((item: MemberGroup) => { return { label: item.name, value: item.id } });
    this.groupsOptions.unshift({ label: "全部", value: '' as any });
  }

}
