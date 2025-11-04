/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { OrderType } from 'common_utils';

import { FoodDetail } from 'feature_food';

export class OrderDetail {
  orderId: string;
  price: number;
  orderType: OrderType | undefined
  orderShop: string;
  takeOutAddress?: string;
  orderTime: string;
  orderStatus : OrderStatus;
  orderItem: FoodDetail[];

  constructor(orderId: string, price: number, orderType: OrderType | undefined, orderShop: string, takeOutAddress: string,
    orderTime: string, orderStatus: OrderStatus, orderItem: FoodDetail[]) {
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
  UN_PAY, // 未支付
  COMMITED, // 已提交
  CANCELED, // 已取消
}

export function getOrderStatusName(orderStatus: OrderStatus):string {
  switch (orderStatus) {
    case OrderStatus.UN_PAY:
      return "未支付"
    case OrderStatus.COMMITED:
      return "处理中"
    case OrderStatus.CANCELED:
      return "已取消"
  }
}

// 购物车对象
export class CartItem {
  cartItemID: string;       // 购物车项唯一id
  foodID: string;         // 食物信息表的主键id
  baseFoodDetail: FoodDetail;       // 基础食物信息
  customizations: Customization[];      // 定制选项存储
  quantity: number;         // 数量
  totalPrice: number;       // 总价

  constructor(foodID: string, baseDetail: FoodDetail) {
    this.cartItemID = this.generateUUID();
    this.foodID = foodID;
    this.baseFoodDetail = baseDetail;
    this.customizations = [];     //初始化为空数组
    this.quantity = baseDetail.buyNum;
    this.totalPrice = baseDetail.price;
  }

  private generateUUID(): string {
    return 'cart_' + Date.now() + '_' + Math.random()
}
}

export interface Customization {
 type: string;        // 定制类型，规格，甜度，温度等
 name: string;        // 选项，如，大杯中杯，去冰加冰
 extraPrice: number;        // 额外价格
 selectedValue?: string;      // 用户选择的值
}

// 存储示例
// 用户选择：大杯、少冰、半糖
/*const cartItem = new CartItem("coffee_001", coffeeDetail);
cartItem.customizations = [
  { type: "size", name: "大杯", extraPrice: 3, selectedValue: "large" },
  { type: "temperature", name: "少冰", extraPrice: 0, selectedValue: "less_ice" },
  { type: "sweetness", name: "半糖", extraPrice: 0, selectedValue: "half_sugar" }
];*/



















