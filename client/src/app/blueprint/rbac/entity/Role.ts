import { User } from "./User";
import { Menu } from "./Menu";
import { Org } from "./Org";

export class Role {
    roleId?: number;
    roleName?: string;
    roleCode?: string;
    createTime?: Date;
    updateTime?: Date;
    createBy?: number;
    createName?: string;
    remark?: string;
    menuIds?: string | any[];
    orgId: number | Org;;
    users?: User[];
    menus?: Menu[]
}