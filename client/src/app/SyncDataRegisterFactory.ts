// import { EntityEnum } from "./entity.enum";
import { MetaCom } from "app/libs/meta-ui/util/meta/MetaCom";
import { getMetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
// import { loadBuiltInMenus } from "./projects/hk/built-in/app.menu";
// import { BuiltInRoles } from "./projects/hk/built-in/app.role";
// import { BuiltInOrgs } from "./projects/hk/built-in/app.org";
// import { BuiltInUsers } from "./projects/hk/built-in/app.user";
// import { rbac } from "./blueprint/rbac";
// import { hk } from "./projects/hk/meta";
// import { Member } from "./projects/xfd_fk/entity/Member";
// import { loadBuiltInMenus as xfdBuiltInMenu } from './projects/xfd_fk/bulit-in/app.menu';
// import { XfdfkBuiltInRoles } from "./projects/xfd_fk/bulit-in/app.role";
// import { XfdfkBuiltInOrgs } from "./projects/xfd_fk/bulit-in/app.org";
// import { XfdFxEntityEnum } from "./projects/xfd_fk/xfd_fk.EntityEnum";
// import { XfdfkBuiltInUsers } from "./projects/xfd_fk/bulit-in/app.user";
// import { Card } from "./projects/xfd_fk/entity/Card";
// import { Order } from "./projects/xfd_fk/entity/Order";
// import { ResetRecord } from "./projects/xfd_fk/entity/ResetRecord";

export interface ISyncTableData {
    database: string;
    objectCode: string;
    dataItems: any[];
    metaCom?: MetaCom;
}

export interface ISyncDatabase {
    database: string;
    tables: ISyncTableData[];
}

export class SyncDataRegisterFactory {
    private static syncDatas: ISyncDatabase[] = [];
    private static syncMenus: { database: string, metaComs: MetaCom[] }[] = [];
    static register(database: string, objectCode: string, dataItems: any[] = []) {
        let exisitDb = this.syncDatas.find(db => database == db.database);
        if (exisitDb) {
            let exisitTable = exisitDb.tables.find(tb => tb.objectCode == objectCode);
            if (exisitTable) {
                exisitTable.dataItems.push(exisitTable.dataItems);
            } else {
                exisitTable = { database, objectCode, dataItems };
                exisitDb.tables.push(exisitTable)
            }
        } else {
            let table = { objectCode, database, dataItems };
            this.syncDatas.push({ database, tables: [table] });
        }
    }
    static registerTable(database: string, metaComs: any[]) {
        metaComs = metaComs.map(metaCom => getMetaEntity(metaCom));
        let existSyncMenu = this.syncMenus.find(syncMenu => syncMenu.database == database);
        if (existSyncMenu) {
            existSyncMenu.metaComs.push(...metaComs);
            existSyncMenu.metaComs.forEach(metacom => metacom.database = database)

        } else {
            existSyncMenu = { database, metaComs: metaComs };
            existSyncMenu.metaComs.forEach(metacom => metacom.database = database)

            this.syncMenus.push(existSyncMenu);
        }
    }
    /**导出系统同步数据 */
    static exportSyncDatas() {
        return this.syncDatas;
    }
    static exportSyncMenu() {
        return this.syncMenus;
    }
}

// SyncDataRegisterFactory.register("hk", EntityEnum.Menu, loadBuiltInMenus());
// SyncDataRegisterFactory.register("hk", EntityEnum.Role, BuiltInRoles);
// SyncDataRegisterFactory.register("hk", EntityEnum.Org, BuiltInOrgs);
// SyncDataRegisterFactory.register("hk", EntityEnum.User, BuiltInUsers);
// SyncDataRegisterFactory.registerTable("hk", rbac.concat(...hk as any));


// // 新发地数据
// SyncDataRegisterFactory.registerTable("xfd_fk", rbac.concat(Member as any).concat(...[Card, Order, ResetRecord] as any));
// SyncDataRegisterFactory.register("xfd_fk", EntityEnum.Menu, xfdBuiltInMenu());
// SyncDataRegisterFactory.register("xfd_fk", EntityEnum.Role, XfdfkBuiltInRoles);
// SyncDataRegisterFactory.register("xfd_fk", EntityEnum.Org, XfdfkBuiltInOrgs);
// SyncDataRegisterFactory.register("xfd_fk", EntityEnum.User, XfdfkBuiltInUsers);

