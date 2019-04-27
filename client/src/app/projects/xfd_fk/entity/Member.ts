import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { EntityEnum } from "app/entity.enum";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { OrgManage } from "app/blueprint/rbac/meta/OrgManage";
import { OneToOne } from "app/libs/meta-ui/util/meta/ref/OneToOne";
import { MemberStatusEnum } from "../enums/MemberStatus.enum";
import { SelectOne } from "app/libs/meta-ui/util/meta/ref/SelectOne";
import { getAlias } from "app/libs/meta-ui/util/meta/alias";
import { S, U, C } from "app/libs/meta-ui/util/meta/Power";
import { Toolbar } from "app/libs/meta-ui/util/meta/Toolbar";
import { CustomUrl } from "app/libs/meta-ui/util/meta/CustomUrl";
// import { DemoStringComponent } from "@shared/com/dynamic-com/demo-string/demo-string.component";
import { DynamicFieldComponent } from "app/libs/meta-ui/util/meta/DynamicFieldComponent";
// import { Query } from "app/libs/meta-ui/util/meta/query/Query";
import { MemberQueryComponent } from "@shared/com/dynamic-com/member-query/member-query.component";
import { DynamicToolbar } from "app/libs/meta-ui/util/meta/custom/DynamicToolbar";
import { Check } from "app/libs/meta-ui/util/meta/Check";
import { Rules } from "app/libs/meta-ui/util/regexp";
// import { Group } from "app/libs/meta-ui/util/meta/Group";
import { MemberGroup } from "./MemberGroup";
// import { RefOne } from "app/libs/meta-ui/util/meta/ref/RefOne";
import { Adapter } from "app/libs/meta-ui/util/meta/Adapter";
import { IcCardReaderComponent } from "app/libs/meta-ui/com/zorro/basic/ic-card-reader/ic-card-reader.component";
import { OrderBy } from "app/libs/meta-ui/util/meta/OrderBy";
// import { FieldJsonComponent } from "@shared/com/dynamic-com/field-json/field-json.component";
// import { DemoEditorComponent } from "@shared/com/dynamic-com/demo-editor/demo-editor.component";





@DynamicToolbar(MemberQueryComponent)
@CustomUrl({ create: '/xfd_fk/member/create' })
@Toolbar([
    // { label: "禁卡", multi: false, eventName: "disabled-card" },
    { label: "充值", eventName: "charge", multi: false },
    { label: "重置", eventName: "reset", multi: false },
    { label: "全部重置", multi: true, eventName: "all-charge", alawysDisplay: true },
    { label: "透支会员", multi: true, eventName: "fee-member", alawysDisplay: true },
    { label: "全部会员", multi: true, eventName: "all-member", alawysDisplay: true },
])
@MetaEntity({ objectCode: EntityEnum.XfdFkMember, objectName: "新发地会员", view: { pageSize: 10 } })
export class Member {
    @ID()
    @Prop("id", { power: 0, readonly: true })
    id: number;
    // @Query()

    @Prop("会员编号", { power: S, readonly: true })
    code: string;
    @Check(Rules.regex.mobile)
    @Prop("手机号")
    mobile: string;
    @Prop("会员名称")
    name: string;
    // @Group({ fields: [{ alias: "会员金额", fieldName: "monthMoney" }] })
    @Prop("剩余金额", { power: S })
    amount: number = 0;

    @Prop("创建时间", { power: 0 })
    createTime: Date = new Date();
    @Check(false)
    /**饭卡 */
    @DynamicFieldComponent(IcCardReaderComponent)
    // @Prop("会员卡号", { power: C | U })
    // set __mealCardNo__(mealCardNo: { ICNO: string, ICSN: string }) {
    //     if (typeof mealCardNo == 'object') {
    //         this.mealCardNo = mealCardNo.ICNO;
    //         this.ICSN = mealCardNo.ICSN;
    //         console.log(mealCardNo);
    //     }
    // }
    // get __mealCardNo__() {
    //     return this.mealCardNo as any;
    // }
    @OrderBy("DESC")
    @Prop("会员卡号")
    mealCardNo: string;
    // @Prop("物理卡号", { power: 0 })
    // ICSN: string;
    @SelectOne(getAlias(MemberStatusEnum))
    @Prop("会员状态", { power: S | U })
    memberStatus: MemberStatusEnum = MemberStatusEnum.Enable
    @OneToOne()
    @Prop("组织id", { power: 0 })
    orgId: OrgManage = 2 as any;
    // @Prop("每月金额")
    // monthMoney: number = 0;
    @Adapter({ read: (memberGroup: MemberGroup) => (typeof memberGroup == 'object') ? memberGroup.name : memberGroup, write: (memberGroup: MemberGroup) => memberGroup.id })
    @OneToOne()
    @Prop("会员分组")
    groupId: MemberGroup;
    @Check(false)
    @Prop("备注")
    remark: string;
    recharge?: number;
    money?: number;

}