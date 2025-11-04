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

import { Logger, OrderType, PreferenceUtil } from 'common_utils';
import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { getOrderStatusName, OrderDetail } from '../model/OrderInfo';
import { FoodDetail } from 'feature_food';

@Component
export struct PageOrderList {
  private context = getContext(this) as common.UIAbilityContext;
  private scroller: Scroller = new Scroller();
  @State orderList: OrderDetail[] = []
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';

  async aboutToAppear() {
    let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.order')
    let value = dataPreferences.getAllSync();
    let allKeys = Object.keys(value);
    Logger.info('getAll keys = ' + allKeys);
    Logger.info("getAll object = " + JSON.stringify(value));

    for (let i = 0; i < allKeys.length; i++) {
      let key = allKeys[i]
      let orderDetail: OrderDetail = JSON.parse(dataPreferences.getSync(key, '').toString())
      this.orderList.push(orderDetail)
    }

    Logger.info("orderList = " + JSON.stringify(this.orderList));
  }

  build() {
    Column() {
      Row() {
        Text("订单列表").fontWeight(600).fontSize(18).alignSelf(ItemAlign.Start).margin({ left: 15, top: 20 })
      }.justifyContent(FlexAlign.Start).width('100%').height(50)


      List({ scroller: this.scroller }) {
        ForEach(this.orderList, (detail: OrderDetail) => {
          ListItem() {
            Column() {

              Row() {
                if (detail.orderType === OrderType.TAKEOUT) {
                  Text("送达地址: " + detail.takeOutAddress)
                }
                if (detail.orderType === OrderType.DINE_IN) {
                  Text("下单店铺: " + detail.orderShop)
                }
                Text(getOrderStatusName(detail.orderStatus)).fontColor(Color.Gray).fontSize(12)
              }.justifyContent(FlexAlign.SpaceBetween).height(30).width('100%').padding({ left: 10, right: 10 })

              ForEach(detail.orderItem, (item: FoodDetail) => {
                Row() {
                  Image($r(item.pic)).height(40).width(40).margin({ left: 10 });
                  Row() {
                    Column() {
                      Row() {
                        Text(item.title);
                      }.width('100%')

                      Row() {
                        Text(item.label).fontSize(12)
                      }.width('100%');
                    }.layoutWeight(1)

                    Column() {
                      Text('￥' + item.price)
                      Text("共" + item.buyNum + "件")
                    }.layoutWeight(1)
                  }.height(40)
                  .justifyContent(FlexAlign.Start)
                  .padding({ top: 5, bottom: 5 })
                  .margin({ left: 10 })
                }
                .width('100%')
                .height(80)
                .borderWidth({ top: 2 })
                .borderColor($r("app.color.system_bg_white"))
              }, (item: FoodDetail) => JSON.stringify(item.id))

              Row() {
                Text("下单时间：" + getFormatTime(detail.orderTime)).fontColor(Color.Gray).fontSize(12)
                Text("总计：￥" + detail.price)
              }
              .width('100%')
              .justifyContent(FlexAlign.SpaceBetween)
              .margin({ bottom: 10 })
              .height(30)
              .padding({ left: 10, right: 10 })
              .borderWidth({ top: 2 })
              .borderColor($r("app.color.system_bg_white"))

            }
            .borderWidth(2)
            .backgroundColor(Color.White)
            .borderColor(Color.White)
            .width('100%')
            .margin({ bottom: 10 })
            .padding(16)
          }
        }, (item: OrderDetail) => JSON.stringify(item.orderId))
      }
      .width('100%')
      .padding(10)
      .scrollBar(BarState.Off)
      .layoutWeight(1)
    }.width('100%').height('100%').backgroundColor($r("app.color.system_bg_white")).padding({top: this.topRectHeight})

  }
}

function getFormatTime(timeStamp: string) {
  let date = new Date(Number.parseInt(timeStamp))
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
      ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}
