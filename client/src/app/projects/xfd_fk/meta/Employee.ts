import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { EntityEnum } from "app/entity.enum";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { QueryObject } from "app/libs/meta-ui/util/stq/QueryObject";


@MetaEntity({ objectCode: EntityEnum.User, objectName: "工作人员的增删改查", data: { presetConditions: QueryObject.toQueryContions({ roleIds: '101' }) } })
export class Employee {
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("用户名")
    userName: string;
    @Prop("密码")
    password: string;
    orgId = 1;
    roleIds = '100';
    @Prop("创建时间", { power: 0 })
    createTime: Date = new Date();
    @Prop("更新时间", { power: 0 })
    updateTime: Date = new Date()
}