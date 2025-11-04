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

import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';

@Component
export struct HomeComponent {

  @StorageLink("selectedIndex") selectedIndex: number = 0;
  @LocalStorageLink("orderType") orderType: OrderType | undefined = undefined;

  build() {
    Column() {
      Scroll() {
        Stack() {

          Column() {
            Stack({alignContent: Alignment.TopStart}) {
              Image($r("app.media.bg_main")).width('100%').height('100%').objectFit(ImageFit.Fill)
              Column() {
                Row() {
                  Text('单单立减 随机免单').fontSize(24).fontWeight(FontWeight.Bold)
                }.width('100%').margin({ left: 70 })

                Row() {
                  Text('*具体规则见活动详情页面').fontSize(10).fontColor(Color.Gray)
                }.width('100%').margin({ left: 70 })
              }.width('100%').margin({ top: 55 })
            }.width('100%').height(500)

            Row() {
              Text("会员活动").fontWeight(500).fontSize(18).margin({ left: 5 })

              Row() {
                Text("更多").margin({ left: 15 })
                Image($r("app.media.ic_public_arrow_right")).height(20).width(20).margin({ left: 5 })
              }
            }.justifyContent(FlexAlign.SpaceBetween).padding(15).width('100%').margin({ top: 130 })

            Image($r("app.media.bg_banner")).width('90%')
          }.width('100%')

          Column() {
            Row() {
              Row() {
                Image($r("app.media.ic_home_header")).height(30).width(30).margin({ left: 5 })
                Text("鸿蒙用户").margin({ left: 5 })
              }

              Button() {
                Text("领取会员福利").fontColor(Color.White)
              }.backgroundColor($r("app.color.system_green")).width(120).height(30)
            }.width('100%').justifyContent(FlexAlign.SpaceBetween).height(30)

            Grid() {
              GridItem() {
                Column() {
                  Image($r("app.media.ic_home_takeout")).height(100)
                  Text("外卖").fontWeight(50)
                }.onClick(() => {
                  RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_TAKE_OUT,
                    animateSwitch: AnimatedMap.ON,
                  })
                })
              }.backgroundColor($r("app.color.system_bg_white")).height('100%').width(150).borderRadius(8)

              GridItem() {
                Column() {
                  Image($r("app.media.ic_home_dinein")).height(100)
                  Text("堂食").fontWeight(50)
                }.onClick(() => {
                  this.orderType = OrderType.DINE_IN
                  this.selectedIndex = 1
                })
              }.backgroundColor($r("app.color.system_bg_white")).height('100%').width(150).borderRadius(8)
            }
            .rowsTemplate('1fr')
            .columnsTemplate('1fr  1fr')
            .height(140)
            .margin({ top: 20 })
            .width('100%')
            .columnsGap(10)

          }
          .height(230)
          .width('90%')
          .backgroundColor(Color.White)
          .borderRadius(16)
          .margin({ top: 220 })
          .padding(15)

        }.width('100%')
      }.scrollable(ScrollDirection.Vertical)
      .edgeEffect(EdgeEffect.Fade)
      .scrollBar(BarState.Off)
      .width('100%')
    }.width('100%').height('100%').backgroundColor($r("app.color.system_bg_white"))
  }
}
