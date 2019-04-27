import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { S } from "app/libs/meta-ui/util/meta/Power";
import { Adapter } from "app/libs/meta-ui/util/meta/Adapter";
import { OrderBy } from "app/libs/meta-ui/util/meta/OrderBy";

@MetaEntity({ objectCode: XfdFxEntityEnum.ResetRecord as any, objectName: "全部重置记录", view: { pageSize: 10 } })
export class ResetRecord {
    @ID()
    @Prop("ID", { power: 0 })
    id?: number;
    @OrderBy("DESC")
    @Adapter({ read: (dt: Date) => dt && dt instanceof Date ? dt.format('yyyy年MM月dd日') : new Date(dt).format('yyyy-MM-dd hh:mm') })
    @Prop("操作时间", { power: S })
    createTime: Date;
    // @Prop("关联人员", { power: S })
    @Prop("操作员", { power: S })
    operatorName: string;
    // @Prop("操作员编号", { power: S })
    operatorNo: string;
}