import { setAlias } from "app/libs/meta-ui/util/meta/alias";

export enum MemberStatusEnum {
    Enable = "Enable",
    Disabled = "Disabled",
    // Cancel="Cancel"
}


setAlias(MemberStatusEnum, [
    { alias: "启用", value: MemberStatusEnum.Enable },
    { alias: "停用", value: MemberStatusEnum.Disabled },

])