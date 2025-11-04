export class OrderDetail {
    constructor(orderId, price, orderType, orderShop, takeOutAddress, orderTime, orderStatus, orderItem) {
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
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["UN_PAY"] = 0] = "UN_PAY";
    OrderStatus[OrderStatus["COMMITED"] = 1] = "COMMITED";
    OrderStatus[OrderStatus["CANCELED"] = 2] = "CANCELED";
})(OrderStatus || (OrderStatus = {}));
export function getOrderStatusName(orderStatus) {
    switch (orderStatus) {
        case OrderStatus.UN_PAY:
            return "未支付";
        case OrderStatus.COMMITED:
            return "处理中";
        case OrderStatus.CANCELED:
            return "已取消";
    }
}
//# sourceMappingURL=OrderInfo.js.map