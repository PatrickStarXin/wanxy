/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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

import { FoodCategory } from 'feature_food';
import { HomeComponent } from 'feature_home';
import { MineComponent } from 'feature_mine';
import { PageOrderList } from 'feature_order';

@Observed
class TabModel {
  text: string = '';
  img: string | Resource = '';
  selectImg: string | Resource = '';
  fontColor: ResourceColor = Color.Black;
  selectFontColor: ResourceColor = $r("app.color.system_green");

  constructor(text: string, img: Resource, selectImg: Resource) {
    this.text = text;
    this.img = img
    this.selectImg = selectImg
  }
}

@Builder
export function MainPageBuilder() {
  MainPage()
}

@Component
@Entry
export struct MainPage {
  @StorageLink("selectedIndex") selectedIndex: number = 0;
  @State isFoodCategoryOnShow: boolean = false
  bottomRectHeight: string = AppStorage.get<number>('bottomRectHeight') + 'px';

  @Builder
  tabBuilder(index: number, content: TabModel) {
    Column({ space: 3 }) {
      Image(this.selectedIndex === index ? content.selectImg : content.img)
        .width(24)
        .height(24)
      Text(content.text)
        .fontSize(10)
        .fontColor(this.selectedIndex === index ? content.selectFontColor : content.fontColor)
    }
  }

  build() {
    NavDestination() {
      Column() {
        Tabs({ index: this.selectedIndex }) {
          TabContent() {
            HomeComponent()
          }.tabBar(this.tabBuilder(0, new TabModel('首页', $r('app.media.ic_home_new'), $r('app.media.ic_home_new_selected')))).clip(false)

          TabContent() {
            FoodCategory({ isFoodCategoryOnShow: this.isFoodCategoryOnShow})
          }.tabBar(this.tabBuilder(1, new TabModel('点餐', $r('app.media.ic_food_new'), $r('app.media.ic_food_new_selected'))))

          TabContent() {
            PageOrderList()
          }.tabBar(this.tabBuilder(2, new TabModel('订单', $r('app.media.ic_order_new'), $r('app.media.ic_order_new_selected'))))

          TabContent() {
            MineComponent()
          }.tabBar(this.tabBuilder(3, new TabModel('我的', $r('app.media.ic_mine_new'), $r('app.media.ic_mine_new_selected'))))
        }
        .barMode(BarMode.Fixed)
        .barPosition(BarPosition.End)
        .barHeight(50)
        .scrollable(false)
        .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
        .onAnimationStart((index, targetIndex) => {
          this.selectedIndex = targetIndex;
        })
      }
      .height('100%')
      .width('100%')
    }.hideTitleBar(true)
    .onShown(() => {
      if (this.selectedIndex === 1) {
        this.isFoodCategoryOnShow = true
      }
    }).onHidden(() => {
      if (this.selectedIndex === 1) {
        this.isFoodCategoryOnShow = false
      }
    })
    .margin({ bottom: this.bottomRectHeight}) // 此处margin具体数值在实际中应与导航条区域高度保持一致

  }
}