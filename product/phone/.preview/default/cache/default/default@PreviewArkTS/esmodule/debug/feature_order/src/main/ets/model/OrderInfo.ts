import type { OrderType } from 'common_utils';
import type { FoodDetail } from 'feature_food';
export class OrderDetail {
    orderId: string;
    price: number;
    orderType: OrderType | undefined;
    orderShop: string;
    takeOutAddress?: string;
    orderTime: string;
    orderStatus: OrderStatus;
    orderItem: FoodDetail[];
    constructor(orderId: string, price: number, orderType: OrderType | undefined, orderShop: string, takeOutAddress: string, orderTime: string, orderStatus: OrderStatus, orderItem: FoodDetail[]) {
        this.orderId = orderId;
        this.price = price;
        this.orderType = orderType;
        this.orderShop = orderShop;
        this.takeOutAddress = takeOutAddress;
        this.orderTime = orderTime;
        this.orderStatus = orderStatus;
        this.orderItem = orderItem;
    }
}
export enum OrderStatus {
    UN_PAY = // 未支付
     0,
    COMMITED = // 已提交
     1,
    CANCELED = // 已取消
     2
}
export function getOrderStatusName(orderStatus: OrderStatus): string {
    switch (orderStatus) {
        case OrderStatus.UN_PAY:
            return "未支付";
        case OrderStatus.COMMITED:
            return "处理中";
        case OrderStatus.CANCELED:
            return "已取消";
    }
}
