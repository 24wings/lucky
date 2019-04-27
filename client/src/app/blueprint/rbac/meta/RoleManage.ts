import { EntityEnum } from "../../../entity.enum";
import { MenuManage } from "./MenuManage";
import { OrgManage } from "./OrgManage";
import { OneToOne } from "app/libs/meta-ui/util/meta/ref/OneToOne";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { OneToMany } from "app/libs/meta-ui/util/meta/ref/OneToMany";
import { Adapter } from "app/libs/meta-ui/util/meta/Adapter";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Role } from "../entity/Role";
import { C, U, D, S } from "app/libs/meta-ui/util/meta/Power";

import { CustomUrl } from "app/libs/meta-ui/util/meta/CustomUrl";

@MetaEntity({
    objectName: "角色管理", data: {
        presetConditions:
            () => [{ field: "orgId", compare: "=", value: localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')).orgId : null, andOr: "and" }]
    }
    , objectCode: EntityEnum.Role, power: S | C | U | D, view: { pageSize: 200 }
})
export class RoleManage implements Table<Role>{
    // @Prop("角色代码")
    // roleCode: string;
    @ID()
    @Prop("角色id", { power: 0 })
    roleId: number;
    // @DynamicFieldComponent(DemoStringComponent)
    @Prop("角色名")
    roleName: string;
    @Adapter({
        write: (ids: string[]) => {
            if (typeof ids == 'string') return ids;
            if (Array.isArray(ids))
                return ids.join(',');
        }
    })
    @OneToMany(MenuManage)
    @Prop("角色菜单")
    menuIds: MenuManage[];
    @OneToOne()
    @Prop("所在组织")
    orgId: OrgManage;
}
