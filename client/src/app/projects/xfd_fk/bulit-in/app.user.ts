import { User } from "app/blueprint/rbac/entity/User";

export const XfdfkBuiltInUsers: User[] = [
    { id: 1, orgId: 1, userName: '123', name: "超级开发者", roleIds: '100', password: '123', createTime: new Date(), updateTime: new Date() },
    { id: 3, orgId: 2, userName: 'admin', name: "管理员", roleIds: '101', password: '123', createTime: new Date(), updateTime: new Date() },
    { id: 2, orgId: 3, userName: 'zgy', name: "张供应", roleIds: '104', password: '123', createTime: new Date(), updateTime: new Date() },
]; 