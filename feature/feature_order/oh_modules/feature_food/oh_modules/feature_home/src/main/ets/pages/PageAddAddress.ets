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
import { TakeOutAddressInfo } from '../model/TakeOutAddressInfo';
import { PreferenceUtil } from 'common_utils';
import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';

@Builder
export function PageAddAddressBuilder() {
  PageAddAddress()
}


@Component
export struct PageAddAddress {
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';
  bottomRectHeight: string = AppStorage.get<number>('bottomRectHeight') + 'px';

  labels: string[] = ['家', '公司', '学校']
  @State labelSelect: number = 0
  @State enableLoading: boolean = false
  @State address: TakeOutAddressInfo = new TakeOutAddressInfo()
  @State nameError: string = ''
  @State phoneError: string = ''
  @State addressDetailError: string = ''

  private context = getContext(this) as common.UIAbilityContext;

  build() {
    NavDestination() {

      Column() {

        Row() {
          Text('收货人').layoutWeight(1)
          TextInput({ placeholder: '请输入姓名' })
            .showUnderline(true)
            .underlineColor(Color.White)
            .showError(this.nameError)
            .layoutWeight(4)
            .margin({ left : 5})
            .onChange((value: string) => {
              this.address.name = value
              if (value != '') {
                this.nameError = ''
              }
            })

        }.rowCommon()

        Row() {
          Text('性别').layoutWeight(1)
          Select([{ value: '先生'}, { value: '女士'}])
            .layoutWeight(5.7)
            .margin({ left : 5})
            .backgroundColor(Color.White)
            .onSelect((index:number, text?: string | undefined)=>{
              this.address.sex = text === '先生'
            })

        }.rowCommon()

        Row() {
          Text('手机号').layoutWeight(1)
          TextInput({ placeholder: '请输入手机号' })
            .showUnderline(true)
            .underlineColor(Color.White)
            .showError(this.phoneError)
            .layoutWeight(4)
            .margin({ left : 5})
            .maxLength(11)
            .onChange((value: string) => {
              this.address.phone = value
              if (value != '') {
                this.phoneError = ''
              }
            })

        }.rowCommon()

        // Row() {
        //   Text('地址').layoutWeight(1)
        //   if (!this.enableLoading) {
        //     Row() {
        //       Text('请选择收货地址').fontColor(Color.Gray).margin({ left : 5})
        //       Image($r('app.media.ic_public_arrow_right')).height(25).width(25).margin({ left: 5 })
        //     }.layoutWeight(4).justifyContent(FlexAlign.Start)
        //     .visibility(this.enableLoading ? Visibility.Hidden : Visibility.Visible)
        //     .onClick(() => {
        //       this.enableLoading = true
        //     })
        //   }
        //   if (this.enableLoading) {
        //     LoadingProgress()
        //       .color(Color.Gray)
        //       .layoutWeight(4)
        //   }
        //
        // }.rowCommon()

        Row() {
          Text('门牌号').layoutWeight(1)
          TextInput({ placeholder: '请输入详细地址' })
            .showUnderline(true)
            .underlineColor(Color.White)
            .showError(this.addressDetailError)
            .layoutWeight(4)
            .margin({ left : 5})
            .onChange((value: string) => {
              this.address.addressDetail = value
              if (value != '') {
                this.addressDetailError = ''
              }
            })

        }.rowCommon()

      }
      .width('90%')
      .margin({ top: 20 })
      .padding(10)
      .backgroundColor(Color.White)
      .borderRadius(8)

      Column() {
        Row() {
          Text('标签').layoutWeight(1)
          Row() {
            ForEach(this.labels, (label:string, index:number) => {
              Button(label, { type: ButtonType.Normal, stateEffect: true })
                .borderRadius(2)
                .backgroundColor(this.labelSelect === index ? $r('app.color.system_green') : $r('app.color.border_color'))
                .borderColor($r('app.color.border_color'))
                .borderWidth(1)
                .fontColor(Color.Black)
                .margin({left: 10})
                .width(60)
                .height(27)
                .onClick(() => {
                  this.labelSelect = index
                  this.address.label = label
                })
            })

          }
        }.rowCommon()

        Row() {
          Text('设为默认地址').layoutWeight(1)
          Toggle({ type: ToggleType.Switch, isOn: false })
            .selectedColor($r('app.color.system_green'))
            .switchPointColor($r('sys.color.comp_background_list_card'))
            .onChange((isOn: boolean) => {
              this.address.isDefault = isOn
            })
        }.rowCommon()
      }
      .width('90%')
      .margin({ top: 10 })
      .padding(10)
      .backgroundColor(Color.White)
      .borderRadius(8)

      Button() {
        Text('保存')
      }.backgroundColor($r('app.color.system_green')).width('90%').height(40).margin({ top: 40 })
      .onClick(() => {
        if (!this.address.name) {
          this.nameError = 'Error : name can not null'
        }
        if (!this.address.phone || this.address.phone.length != 11) {
          this.phoneError = 'Error : phone must be 11'
        }
        if (!this.address.addressDetail) {
          this.addressDetailError = 'Error : address can not null'
        }
        if (this.address.name && this.address.phone.length == 11 && this.address.addressDetail) {
          let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.address')
          dataPreferences.putSync(this.address.addressDetail, JSON.stringify(this.address))
          dataPreferences.flush()
          RouterModule.push({
            stackName: NavStackMap.MAIN_STACK,
            url: NavRouterMap.PAGE_TAKE_OUT,
            animateSwitch: AnimatedMap.ON,
          })
          PreferenceUtil.showToastMessage('新增成功')
        }

      })

    }.title('新增地址')
    .backgroundColor($r('app.color.system_bg_white'))
    .padding({ bottom: this.bottomRectHeight, top: this.topRectHeight })
  }
}

@Extend(Row)
function rowCommon() {
  .width('100%')
  .height(50)
  .justifyContent(FlexAlign.SpaceBetween)
  .borderWidth({ bottom: 1 })
  .borderColor($r('app.color.border_color'))
}
