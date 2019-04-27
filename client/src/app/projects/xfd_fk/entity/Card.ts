import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { CardStatusEnum } from "../enums/CardStatus.enum";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { SelectOne } from "app/libs/meta-ui/util/meta/ref/SelectOne";
import { getAlias } from "app/libs/meta-ui/util/meta/alias";

@MetaEntity({ objectCode: XfdFxEntityEnum.Card as any, objectName: "卡号" })
export class Card {
    @ID()
    @Prop("卡id", { power: 0 })
    id: number;            // id
    @Prop("会员卡号")
    cardNo: string;        // 卡号
    @SelectOne(getAlias(CardStatusEnum))
    @Prop("卡状态")
    cardStatus: CardStatusEnum; // 卡状态
    @Prop("商户号")
    merchNo: string;       // 商户号
}