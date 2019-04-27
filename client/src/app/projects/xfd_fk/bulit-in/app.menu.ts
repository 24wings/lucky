import 'reflect-metadata';
import { C, U, D, Q, AC1 } from 'app/libs/meta-ui/util/meta/Power';
import { UserManage } from 'app/blueprint/rbac/meta/UserManage';
import { RoleManage } from 'app/blueprint/rbac/meta/RoleManage';
import { MenuManage } from 'app/blueprint/rbac/meta/MenuManage';
import { OrgManage } from 'app/blueprint/rbac/meta/OrgManage';
import { Member } from '../entity/Member';
import { Order } from '../entity/Order';
import { ResetRecord } from '../entity/ResetRecord';
import { Employee } from '../meta/Employee';
import { AnalyzeManage } from '../meta/AnalyzeManage';
import { MemberGroup } from '../entity/MemberGroup';


export interface MenuMetaCom {
    menuId: number;
    text: string;
    parentId: number,
    menuCode?: number;
    link?: string, metaCom?: any;
}
const MenuLink = '/xfd_fk/admin/user/dynamic-menu';
/**
 * 开发者菜单
 */
export const DevMenu: MenuMetaCom[] = [
    // 系统设置
    { menuId: 100, text: "系统设置", parentId: 0 },
    // 开发者管理
    { menuId: 101, text: "用户管理", parentId: 100, link: MenuLink + '/user', metaCom: UserManage },
    { menuId: 105, text: "用户添加", parentId: 101, menuCode: C, },
    { menuId: 106, text: "用户更新", parentId: 101, menuCode: U, },
    { menuId: 107, text: "用户删除", parentId: 101, menuCode: D, },
    { menuId: 108, text: "用户查询", parentId: 101, menuCode: Q, },
    // 组织
    { menuId: 102, text: "组织管理", parentId: 100, link: MenuLink + '/org', metaCom: OrgManage },
    { menuId: 110, text: "组织添加", parentId: 102, menuCode: C },
    { menuId: 111, text: "组织更新", parentId: 102, menuCode: U },
    { menuId: 112, text: "组织删除", parentId: 102, menuCode: D },
    { menuId: 113, text: "组织查询", parentId: 102, menuCode: Q },
    //角色
    { menuId: 103, text: "角色管理", parentId: 100, link: MenuLink + '/role', metaCom: RoleManage },
    { menuId: 150, text: "角色添加", parentId: 103, menuCode: C },
    { menuId: 151, text: "组织更新", parentId: 103, menuCode: U },
    { menuId: 152, text: "组织删除", parentId: 103, menuCode: D },
    { menuId: 153, text: "组织查询", parentId: 103, menuCode: Q },
    //  菜单
    { menuId: 104, text: "菜单管理", parentId: 100, link: MenuLink + '/menu', metaCom: MenuManage },
    { menuId: 160, text: "菜单添加", parentId: 104, menuCode: C },
    { menuId: 161, text: "菜单更新", parentId: 104, menuCode: U },
    { menuId: 162, text: "菜单删除", parentId: 104, menuCode: D },
    { menuId: 163, text: "菜单查询", parentId: 104, menuCode: Q },
]


export const AdminMenu: MenuMetaCom[] = [
    ///基本设置
    { menuId: 120, text: "会员操作", parentId: 0, },
    { menuId: 161, text: "会员分组", parentId: 120, link: MenuLink + '/member-group', metaCom: MemberGroup },
    { menuId: 162, text: "分组添加", parentId: 161, menuCode: C },
    { menuId: 163, text: "分组更新", parentId: 161, menuCode: U },
    { menuId: 164, text: "分组删除", parentId: 161, menuCode: D },
    { menuId: 165, text: "分组查询", parentId: 161, menuCode: Q },
    // 会6
    { menuId: 121, text: "会员开户", parentId: 120, link: MenuLink + '/member', metaCom: Member },
    { menuId: 122, text: "会员添加", parentId: 121, menuCode: C },
    { menuId: 123, text: "会员更新", parentId: 121, menuCode: U },
    { menuId: 124, text: "会员删除", parentId: 121, menuCode: D },
    { menuId: 125, text: "会员查询", parentId: 121, menuCode: Q },
    { menuId: 126, text: "会员充值", parentId: 121, menuCode: AC1 },
    // 交易查询
    { menuId: 130, text: "订单查询", parentId: 120, link: MenuLink + '/order', metaCom: Order },
    { menuId: 131, text: "添加", parentId: 130, menuCode: C },
    { menuId: 132, text: "更新", parentId: 130, menuCode: U },
    { menuId: 133, text: "删除", parentId: 130, menuCode: D },
    { menuId: 134, text: "查询", parentId: 130, menuCode: Q },
    // 重置记录
    { menuId: 140, text: "重置记录", parentId: 120, link: MenuLink + '/reset-record', metaCom: ResetRecord },
    { menuId: 141, text: "添加", parentId: 140, menuCode: C },
    { menuId: 142, text: "更新", parentId: 140, menuCode: U },
    { menuId: 143, text: "删除", parentId: 140, menuCode: D },
    { menuId: 144, text: "查询", parentId: 140, menuCode: Q },

    // 重置记录
    { menuId: 140, text: "统计分析", parentId: 120, link: MenuLink + '/analyze', metaCom: AnalyzeManage },

];

/** 内置所有菜单 */
export function loadBuiltInMenus(): MenuMetaCom[] {
    return DevMenu.concat(...AdminMenu)
}


