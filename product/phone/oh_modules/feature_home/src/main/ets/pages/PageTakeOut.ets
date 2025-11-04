/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Logger, OrderType, PreferenceUtil } from 'common_utils';
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';
import { TakeOutAddressInfo } from '../model/TakeOutAddressInfo';
import { preferences } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';

@Builder
export function PageTakeOutBuilder() {
  PageTakeOut()
}

@Component
export struct PageTakeOut {
  @LocalStorageLink('chooseTakeOutAddr') chooseTakeOutAddr: string = '';
  @LocalStorageLink('orderType') orderType: OrderType | undefined = undefined;
  @StorageLink('selectedIndex') selectedIndex: number = 0;
  @State addressList: TakeOutAddressInfo[] = []
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';
  bottomRectHeight: string = AppStorage.get<number>('bottomRectHeight') + 'px';
  private context = getContext(this) as common.UIAbilityContext;

  async aboutToAppear() {
    let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.address')
    let value = dataPreferences.getAllSync();
    let allKeys = Object.keys(value);
    Logger.info('getAll keys = ' + allKeys);
    Logger.info('getAll object = ' + JSON.stringify(value));

    for (let i = 0; i < allKeys.length; i++) {
      let key = allKeys[i]
      let address: TakeOutAddressInfo = JSON.parse(dataPreferences.getSync(key, '').toString())
      this.addressList.push(address)
    }

    Logger.info('addressList = ' + JSON.stringify(this.addressList));
  }

  build() {
    NavDestination() {
      Stack({ alignContent: Alignment.BottomStart }) {

        List() {
          ForEach(this.addressList, (addressInfo: TakeOutAddressInfo, index: number) => {
            ListItem() {
              Column() {
                Row() {
                  Text(addressInfo.label)
                  Text(addressInfo.addressDetail).margin({ left: 5 })
                }.width('100%').justifyContent(FlexAlign.Start).layoutWeight(1)

                Row() {
                  Text(addressInfo.name).fontColor(Color.Gray)
                  Text(addressInfo.phone).fontColor(Color.Gray).margin({ left: 5 })
                }.width('100%').justifyContent(FlexAlign.Start).layoutWeight(1)

              }
              .height(80)
              .width('100%')
              .backgroundColor(Color.White)
              .borderRadius(8)
              .padding(10)
              .margin({ top: 20 })
              .onClick(() => {
                this.orderType = OrderType.TAKEOUT
                this.chooseTakeOutAddr = addressInfo.addressDetail
                this.selectedIndex = 1
                RouterModule.push({
                  stackName: NavStackMap.MAIN_STACK,
                  url: NavRouterMap.PAGE_MAIN,
                  animateSwitch: AnimatedMap.ON,
                })
                PreferenceUtil.showToastMessage('选择地址:' + this.chooseTakeOutAddr)
              })
            }
          }, (item: string) => JSON.stringify(item))
        }
        .edgeEffect(EdgeEffect.Fade)
        .scrollBar(BarState.Off)
        .height('100%')

        Button() {
          Text(' + 新增地址')
        }.backgroundColor($r('app.color.system_green')).width('100%').height(40)
        .onClick(() => {
          RouterModule.push({
            stackName: NavStackMap.MAIN_STACK,
            url: NavRouterMap.PAGE_ADD_ADDRESS,
            animateSwitch: AnimatedMap.ON,
          })
        })

      }.width('90%').height('100%')
    }.title('我的地址')
    .backgroundColor($r('app.color.system_bg_white'))
    .padding({ bottom: this.bottomRectHeight, top: this.topRectHeight })
  }
}