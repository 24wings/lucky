import { Org } from "app/blueprint/rbac/entity/Org";

export const XfdfkBuiltInOrgs: Org[] = [
    { orgId: 1, orgName: "系统", parentId: 0, createTime: new Date(), creator: "系统内置" },
    { orgId: 2, orgName: "管理员组织", parentId: 1, createTime: new Date(), creator: "系统内置" },
    { orgId: 3, orgName: "供应商", parentId: 1, createTime: new Date(), creator: "系统内置" },
    { orgId: 4, orgName: '发行商', parentId: 1, createTime: new Date(), creator: "系统内置" },
    { orgId: 5, orgName: '代理商', parentId: 1, createTime: new Date(), creator: "系统内置" },

]
