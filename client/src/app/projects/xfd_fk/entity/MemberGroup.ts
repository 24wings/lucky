import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { C, U, D } from "app/libs/meta-ui/util/meta/Power";

@MetaEntity({ objectCode: XfdFxEntityEnum.MemberGroup as any, objectName: "会员分组", power: C | U | D, })
export class MemberGroup {
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("分组名称")
    name: string;
    @Prop("每月限额")
    monthMoney: number = 0;
}