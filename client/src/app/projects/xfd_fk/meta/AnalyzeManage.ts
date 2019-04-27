import { Member } from "../entity/Member";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { S } from "app/libs/meta-ui/util/meta/Power";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { EntityEnum } from "app/entity.enum";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { DynamicToolbar } from "app/libs/meta-ui/util/meta/custom/DynamicToolbar";
import { AnalyzeQueryToolbarComponent } from "@shared/com/dynamic-com/analyze-query-toolbar/analyze-query-toolbar.component";
import { Summary } from "app/libs/meta-ui/util/meta/Summary";

@DynamicToolbar(AnalyzeQueryToolbarComponent)
@MetaEntity({ objectCode: XfdFxEntityEnum.Member as any, objectName: "统计分析", firstLoad: false, view: { pageSize: 100 } })
export class AnalyzeManage implements Table<Member>{
    @Prop("会员名称")
    name: string;
    @Prop("余额", { power: S })
    amount: number = 0;
    @Prop("手机", { power: S })
    mobile: string;
    @Summary([{ fieldName: "recharge", method: "SUM", alias: "总充值", colspan: 2, rowspan: 2 }])
    @Prop("充值")
    recharge: number = 0;
    @Summary([{ fieldName: "money", method: "SUM", alias: "总消费", colspan: 2, rowspan: 2 }])
    @Prop("消费")
    money: number = 0;

} 