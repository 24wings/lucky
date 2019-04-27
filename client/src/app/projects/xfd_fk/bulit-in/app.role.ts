import { Role } from "app/blueprint/rbac/entity/Role";
import { AdminMenu, DevMenu, loadBuiltInMenus, } from "./app.menu";


export const XfdfkBuiltInRoles: Role[] = [
    { orgId: 1, roleId: 100, roleCode: "developer", roleName: "开发者", menuIds: loadBuiltInMenus().map(menu => menu.menuId).join(','), createTime: new Date() },
    { orgId: 2, roleId: 101, roleCode: "admin", roleName: "管理员", menuIds: AdminMenu.map(menu => menu.menuId).join(','), createTime: new Date() },
    // { orgId: 3, roleId: 102, roleCode: "gongyingshang", roleName: "供应商", menuIds: loadAgentMenus().map(menu => menu.menuId).join(','), createTime: new Date() },
    // { orgId: 4, roleId: 103, roleCode: "caigoushang", roleName: "采购商", menuIds: UserMenu.map(menu => menu.menuId).join(','), createTime: new Date() },
    // { orgId: 5, roleId: 104, roleCode: "agent", roleName: "代理商", menuIds: AgentMenu.map(menu => menu.menuId).join(','), createTime: new Date() },

] 