import { User } from "./User";

/**
 * 组织
 * 
 */
export class Org {
    orgId?: number;
    orgName?: string;
    parentId?: number | any;
    marketId?: number;
    creator?: string;
    createTime?: Date;
    users?: User[];

}
