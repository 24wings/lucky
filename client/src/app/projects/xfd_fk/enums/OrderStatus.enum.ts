import { setAlias } from "app/libs/meta-ui/util/meta/alias";

export enum OrderStatusEnum {
    UNSUBMITTED = 1, SUBMITTED, CONFIRMED, DEPOSIT_PAID, ALL_PAID, TICKET_OUT, CANCELED
}
setAlias(OrderStatusEnum, [
    { value: OrderStatusEnum[OrderStatusEnum.UNSUBMITTED], alias: "未提交" },
    { value: OrderStatusEnum[OrderStatusEnum.SUBMITTED], alias: "已提交" },
    { value: OrderStatusEnum[OrderStatusEnum.CONFIRMED], alias: "已确认" },
    { value: OrderStatusEnum[OrderStatusEnum.DEPOSIT_PAID], alias: "定金已付" },
    { value: OrderStatusEnum[OrderStatusEnum.ALL_PAID], alias: "全款已付" },
    { value: OrderStatusEnum[OrderStatusEnum.TICKET_OUT], alias: "已出票" },
    { value: OrderStatusEnum[OrderStatusEnum.CANCELED], alias: "已取消" },
]);
