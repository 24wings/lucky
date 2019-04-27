import { Component, OnInit } from '@angular/core';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { CustomQueryToolbarComSpec } from 'app/libs/meta-ui/util/spec/custom/custom-query-toolbar';
import { QueryParam } from 'app/libs/meta-ui/util/stq/QueryParameter';

enum OrderType {
  TRANS, // 交易
  RECHARGE // 充值
}

@Component({
  selector: 'order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css']
})
export class OrderQueryComponent extends CustomQueryToolbarComSpec implements OnInit {
  cardNo: string;
  dateRange: Date[] = [];
  page: number = 0;
  pageSize: number = 10;
  OrderTypeOptions: { label: string, value }[] = [{ label: "全部", value: false },
  { label: "交易", value: 0 },
  { label: "充值", value: 1 }, {
    label: "清零", value: 2
  }]
  selectedOrderType;
  ngOnInit() {
  }

  async query(n) {
    if (n != null) this.page = n;
    else this.page = 0;
    let queryParam = new QueryParam();
    queryParam.queryConditions = []
    if (this.cardNo) {
      queryParam.queryConditions.push({ field: "cardNo", value: this.cardNo, andOr: "and", compare: "like" });
    }
    queryParam.pageParam = { pageIndex: 0, pageSize: 10 };
    if (this.dateRange.length > 1) {
      queryParam.queryConditions.push({ field: "createTime", value: this.dateRange[0].format('yyyy-MM-dd hh:mm'), compare: ">", andOr: "and" })
      queryParam.queryConditions.push({ field: "createTime", value: this.dateRange[1].format('yyyy-MM-dd hh:mm'), compare: "<", andOr: "and" })
    }
    if (this.selectedOrderType || this.selectedOrderType === 0) {
      queryParam.queryConditions.push({ field: "orderType", value: this.selectedOrderType, compare: "=", andOr: "and" })
    }
    queryParam.orderList = [{ fieldName: "createTime", sort: "DESC" }];
    queryParam.pageParam = { pageIndex: this.page, pageSize: this.pageSize };
    let data = await this.dataStrategy.entityQuery(this.metaCom, queryParam);
    this.queryResult.emit(data.paging);
  }
  constructor(public dataStrategy: IDataStrategy) {
    super();
  }

}
