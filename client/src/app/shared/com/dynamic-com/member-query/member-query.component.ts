import { Component, OnInit } from '@angular/core';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { Member } from 'app/projects/xfd_fk/entity/Member';
import { XfdFxEntityEnum } from 'app/projects/xfd_fk/xfd_fk.EntityEnum';
import { MemberGroup } from 'app/projects/xfd_fk/entity/MemberGroup';
import { CustomQueryToolbarComSpec } from 'app/libs/meta-ui/util/spec/custom/custom-query-toolbar';
import { QueryParam } from 'app/libs/meta-ui/util/stq/QueryParameter';
import { MetaCom } from 'app/libs/meta-ui/util/meta/MetaCom';

@Component({
  selector: 'member-query',
  templateUrl: './member-query.component.html',
  styleUrls: ['./member-query.component.css']
})
export class MemberQueryComponent extends CustomQueryToolbarComSpec implements OnInit {
  mobile: string = '';
  mealCardNo: string = '';
  name: string = '';
  singleValue = '';
  groupsOptions: { label: string, value: number }[] = []
  async query(num?: number) {
    let queryparam = new QueryParam();
    queryparam.orderList = [{ fieldName: 'mealCardNo', sort: 'DESC' }]
    if (num) {
      queryparam.pageParam = { pageIndex: num, pageSize: 10 };
    }
    queryparam.queryConditions = [];
    if (this.mealCardNo) {
      queryparam.queryConditions.push({ field: 'mealCardNo', compare: "like", andOr: "and", value: this.mealCardNo })
    }
    if (this.name) {
      queryparam.queryConditions.push({ field: 'name', compare: "like", andOr: "and", value: this.name })
    }
    if (this.singleValue) {
      queryparam.queryConditions.push({ field: 'groupId', compare: "=", andOr: "and", value: this.singleValue });

    }
    if (this.mobile) {
      queryparam.queryConditions.push({ field: 'mobile', compare: "like", andOr: "and", value: this.mobile });
    }

    let result = await this.dataStrategy.entityQuery(this.metaCom, queryparam);
    this.queryResult.emit(result.paging);
  }
  constructor(public dataStrategy: IDataStrategy) { super() }

  async  ngOnInit() {
    this.loadGroupOptions();
  }
  async loadGroupOptions() {
    let groupsResult = await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.MemberGroup as any } as MetaCom, new QueryParam());

    this.groupsOptions = groupsResult.paging.rows.map((item: MemberGroup) => { return { label: item.name, value: item.id } });
    this.groupsOptions.unshift({ label: "全部", value: '' as any });

  }

}
