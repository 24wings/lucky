import { EntityEnum } from "app/entity.enum";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { AbstractTree } from "app/libs/meta-ui/util/struct/AbstractTree";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { Check } from "app/libs/meta-ui/util/meta/Check";
import { OneToOne } from "app/libs/meta-ui/util/meta/ref/OneToOne";
import { C } from "app/libs/meta-ui/util/meta/Power";
import { Org } from "../entity/Org";
import { LazyClass } from "app/libs/meta-ui/util/meta/Lazy";
import { CustomUrl } from "app/libs/meta-ui/util/meta/CustomUrl";

@CustomUrl({ query: '/api/rbac/org/load' })
@LazyClass()
@MetaEntity({
    objectCode: EntityEnum.Org, objectName: "组织管理",
    data: {
        presetConditions: () => [
            // { field: "orgId", compare: "=", value: JSON.parse(localStorage.getItem('employee') ? localStorage.getItem('employee') : '{}').orgId, andOr: "or" }
        ]
    },
    view: { pageSize: 200 }, lifeCycle: { afterCreateSuccess: (data: OrgManage) => '' }
})
export class OrgManage extends AbstractTree<Org> implements Table<Org>{
    getId() { return this.orgId; }
    getText() { return this.orgName; }
    getParentId() { return this.parentId as any; }
    @ID()
    @Prop("组织Id", { power: 0 })
    orgId: number;
    @Check({ maxLength: 10 })
    @Prop("组织名称", { dynamicHtml: 'hello' })
    orgName: string;
    @OneToOne()
    @Prop("上级组织")
    parentId: OrgManage;
    @Prop("创建时间", { power: 0 })
    createTime: Date = new Date();
    @Prop("创建者", { power: C, readonly: true })
    creator: string = localStorage.getItem("employee") && localStorage.getItem("employee") != "undefined" ? JSON.parse(localStorage.getItem("employee")).name : "";
}