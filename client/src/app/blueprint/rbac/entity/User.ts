import { MarketStatusEnum } from "../enums/MarketStatus.enum";
import { Role } from "./Role";
import { Org } from "./Org";

/**
 * 员工表
 */
export class User {
    id?: number;
    name?: string;
    userName?: string;
    password?: string | any;
    pwdEncrypted?: boolean;
    createTime?: Date;
    updateTime?: Date;
    status?: MarketStatusEnum;
    orgId?: number | Org;
    creatorName?: string;
    marketId?: number;
    creatorId?: number;
    roleIds?: string | Role[] | Role;
    roles?: Role[];
    org?: Org;
}