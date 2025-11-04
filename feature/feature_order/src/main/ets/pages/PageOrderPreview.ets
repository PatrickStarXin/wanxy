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

import { FoodDetail, getBuyFoods } from 'feature_food';
import { promptAction } from '@kit.ArkUI';
import { Logger, OrderType, PreferenceUtil } from 'common_utils';
import { preferences, relationalStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { OrderDetail, OrderStatus } from '../model/OrderInfo';
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';
import { data } from '@kit.TelephonyKit';
import  DatabaseService  from 'common_utils'
import { hilog } from '@kit.PerformanceAnalysisKit';

@Builder
export function PageOrderPreviewBuilder() {
  PageOrderPreview()
}

@Entry
@Component
export struct PageOrderPreview {
  @LocalStorageLink("chooseTakeOutAddr") chooseTakeOutAddr: string = "";
  @LocalStorageLink("orderType") orderType: OrderType | undefined = undefined;
  @LocalStorageLink("chooseShop") chooseShop: string = ""

  @LocalStorageLink("choosePrice") choosePrice: number = 0;
  @LocalStorageLink("buyFoods") buyFoods: Map<string, FoodDetail> = new Map<string, FoodDetail>();
  @StorageLink("selectedIndex") selectedIndex: number = 0;
  @State enableLoading: boolean = false
  @State isTakeOut: boolean = false
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';
  bottomRectHeight: string = AppStorage.get<number>('bottomRectHeight') + 'px';

  private context = getContext(this) as common.UIAbilityContext;

  build() {
    NavDestination() {
      Stack({ alignContent: Alignment.Bottom }) {
        Column() {
          // 店铺
          Row() {
            Row() {
              Text(this.chooseShop).margin({ left: 15 })
              Image($r("app.media.ic_public_arrow_right")).height(15).width(15).margin({ left: 5 })
            }.onClick(() => {

            })
            Toggle({ type: ToggleType.Switch, isOn: false })
          }.commonStyle().height(60).justifyContent(FlexAlign.SpaceBetween)

          // 外卖/堂食
          this.buildDineIn()
          this.buildTakeOut()


          // 商品列表
          Scroll() {
            Column() {
              ForEach(getBuyFoods(this.buyFoods), (foodDetail: FoodDetail) => {
                Row() {
                  Image($r(foodDetail.pic)).height(50).objectFit(ImageFit.Fill).layoutWeight(1)
                  Column() {
                    Row() {
                      Text(foodDetail.title).fontSize(16).fontWeight(500)
                      Text("￥" + foodDetail.price).fontSize(16).fontWeight(500)
                    }.width('100%').justifyContent(FlexAlign.SpaceBetween)

                    Row() {
                      Text(foodDetail.desc).fontColor(Color.Gray)
                      Text("x" + foodDetail.buyNum + "").fontColor(Color.Gray)
                    }.width('100%').justifyContent(FlexAlign.SpaceBetween)

                  }.layoutWeight(6)
                }.height(50).width('100%')
              }, (item: FoodDetail) => JSON.stringify(item.id))
            }.commonStyle()
          }
          .scrollable(ScrollDirection.Vertical)
          .edgeEffect(EdgeEffect.Fade)
          .commonStyle()
          .padding(16)
          .scrollBar(BarState.Off)

          // 优惠券
          // 支付渠道
          // 备注

        }.height('100%')

        // 提交订单
        Row() {
          Row() {
            Text("待付款").margin({left : 10})
            Text("￥" + this.choosePrice).fontSize(18).fontWeight(500);
          };

          Row() {
            Text("付款")
          }.justifyContent(FlexAlign.Center).height('100%').width(100).backgroundColor($r("app.color.system_green"))
          .onClick(async () => {
            // 模拟付款
            this.enableLoading = true

            setTimeout(() => {
              this.enableLoading = false;

              // 插入订单信息
              let orderTime = Date.parse(new Date().toString()) + "";
              this.saveOrderInfo(orderTime,this.chooseShop);

              // 生成订单
              let key = Date.parse(new Date().toString()) + ""
              let value: FoodDetail[] = []
              this.buyFoods.forEach((detail: FoodDetail) => {
                value.push(detail)
              })
              Logger.info("key is :" + key)
              Logger.info("value is :" + JSON.stringify(value))

              let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.order')
              dataPreferences.putSync(key, JSON.stringify(new OrderDetail("FD" + key, this.choosePrice, this.orderType, this.chooseShop, this.chooseTakeOutAddr, key, OrderStatus.COMMITED, value)))
              dataPreferences.flush()

              // 清理购物车
              this.choosePrice = 0
              this.buyFoods.clear()

              // 跳转订单页
              this.selectedIndex = 2
              RouterModule.push({
                stackName: NavStackMap.MAIN_STACK,
                url: NavRouterMap.PAGE_MAIN,
                animateSwitch: AnimatedMap.ON,
              })

              PreferenceUtil.showToastMessage("下单成功")
            }, 2000)

            // todo 弹出确认框，是否支付
            // promptAction.openCustomDialog({
            //   builder: () => {
            //     this.customDialogComponent()
            //   },
            //   alignment: DialogAlignment.BottomStart,
            //   showInSubWindow: false,
            //   offset: { dx: 0, dy: 0 },
            //   cornerRadius: 0,
            //   width: '100%',
            //   height: 150,
            //
            // }).then((dialogId: number) => {
            //   customDialogId = dialogId
            // })
          })
        }
        .height(70)
        .justifyContent(FlexAlign.SpaceBetween)
        .borderWidth({ top: 1 })
        .borderColor($r("app.color.system_bg_white"))
        .width('100%')
        .backgroundColor(Color.White)

        LoadingProgress()
          .color(Color.Gray)
          .width(100)
          .margin({bottom: 200})
          .visibility(this.enableLoading ? Visibility.Visible : Visibility.Hidden)

      }.width('100%')

    }.title("订单结算")
    .backgroundColor($r("app.color.system_bg_white"))
    .padding({ bottom: this.bottomRectHeight, top: this.topRectHeight})

  }

  async saveOrderInfo(orderTime:string, storeName: string) {
    try {
      // 遍历购买的商品，为每个商品插入一条记录
      for (let entry of this.buyFoods.entries()) {
        let foodId = entry[0]; // 第一个元素是键（foodId）
        let foodDetail = entry[1]; // 第二个元素是值（FoodDetail对象）

        const valuesBucket: relationalStore.ValuesBucket = {
          ORDER_NO: "FD" + orderTime, // 订单号，加上FD前缀
          FOOD_ID: parseInt(foodId), // 食物ID（从Map的键获取）
          ORDER_QUANTITY: foodDetail.buyNum, // 购买数量
          ORDER_TIME: parseInt(orderTime), // 下单时间戳
          STORE_NAME: storeName // 店铺名称
        }
        const rowId = await DatabaseService.commonInsert('ORDER_INFO', valuesBucket);

        if (rowId === -1) {
          hilog.error(0x0000, 'PageOrderPreview_saveOrderInfo', `插入订单商品失败: 食物ID=${foodId}`);
        } else {
          hilog.info(0x0000, 'PageOrderPreview_saveOrderInfo', `订单商品插入成功: 行ID=${rowId},订单号=${"FD" + orderTime}, 食物ID=${foodId}, 数量=${foodDetail.buyNum}`);
        }
      }
    } catch (err) {
      hilog.error(0x0000, 'PageOrderPreview_saveOrderInfo', '保存订单信息失败: ' + err);
      // 可以根据需要抛出错误或返回错误状态
    }
  }

  @Builder
  buildTakeOut() {
    if (this.orderType == OrderType.TAKEOUT) {
      Column() {
        Row() {
          Text("预计送达时间");
          Row() {
            Text("18:30").fontColor(Color.Gray);
            Image($r("app.media.ic_public_arrow_right")).height(20).width(20).margin({ left: 5 });
          };
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').layoutWeight(1).padding(10);

        Row() {
          Text("送达地址: " + this.chooseTakeOutAddr);
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').layoutWeight(1).padding(10);
      }.commonStyle().height(100);
    }
  }

  @Builder
  buildDineIn() {
    // 外卖/堂食
    if (this.orderType == OrderType.DINE_IN) {
      Column() {
        Row() {
          Text("取餐时间");
          Row() {
            Text("18:30").fontColor(Color.Gray);
            Image($r("app.media.ic_public_arrow_right")).height(20).width(20).margin({ left: 5 });
          };
        }.justifyContent(FlexAlign.SpaceBetween).width('100%').layoutWeight(1).padding(10);

        Row() {
          Row() {
            Toggle({ type: ToggleType.Checkbox, isOn: !this.isTakeOut }).selectedColor($r("app.color.system_green"))
              .onChange((isOn: boolean) => {
                if (isOn) {
                  this.isTakeOut = !this.isTakeOut;
                }
              });
            Text("店内堂食");
          }.height('100%')
          .layoutWeight(1)
          .justifyContent(FlexAlign.Center);


          Row() {
            Toggle({ type: ToggleType.Checkbox, isOn: this.isTakeOut }).selectedColor($r("app.color.system_green"))
              .onChange((isOn: boolean) => {
                if (isOn) {
                  this.isTakeOut = !this.isTakeOut;
                }
              });
            Text("打包带走");
          }
          .layoutWeight(1)
          .height('100%')
          .justifyContent(FlexAlign.Center)
          .borderWidth({ left: 2 })
          .borderColor($r("app.color.system_bg_white"));

        }.width('100%').layoutWeight(1)
        .borderWidth({ top: 2 })
        .borderColor($r("app.color.system_bg_white"));

      }.commonStyle().height(100);
    }
  }

  @Builder
  customDialogComponent() {
    customDialogBuilder()
  }

  @Styles
  commonStyle() {
    // 店铺
    .backgroundColor(Color.White)
    .width('90%')
    .margin({ top: 10, left: '5%', right: '5%' })
    .padding(10)
    .borderRadius(8)
  }

  @Builder
  NavigationTitle() {
    Row() {
      Text('订单结算')
        .fontSize(18)
        .lineHeight(50)

    }.width('100%').height(50)
  }
}


let customDialogId: number = 1

@Builder
function customDialogBuilder() {
  Column() {
    Text('Custom dialog Message').fontSize(10).onClick(() => {
      promptAction.closeCustomDialog(customDialogId)
    })
  }
}

