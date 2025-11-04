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

import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';
import { map, mapCommon, MapComponent } from '@kit.MapKit';
import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
import { getShopByName, ShopDetail, ShopDetailList } from '../model/ShopModelData';
import { MapUtil } from '../utils/MapUtil';
import { common, Want } from '@kit.AbilityKit';
import { call } from '@kit.TelephonyKit';

@Builder
export function PageShopListBuilder() {
  PageShopList()
}


@Component
export struct PageShopList {
  @State latitude: number = 0
  @State longitude: number = 0
  private mapOptions?: mapCommon.MapOptions;
  private mapController?: map.MapComponentController;
  private callback?: AsyncCallback<map.MapComponentController>;
  @State closeMap: string = "收起地图"
  @State closeMapImg: Resource = $r("app.media.ic_public_arrow_up_0")
  @State shopList: ShopDetail[] = []
  @State preChooseShop: string = "南京雨花客厅店"
  @LocalStorageLink("chooseShop") chooseShop: string = ""
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';
  bottomRectHeight: string = AppStorage.get<number>('bottomRectHeight') + 'px';

  aboutToAppear(): void {
    this.preChooseShop = this.chooseShop

    // 初始化请求附近的地点
    this.shopList = ShopDetailList
    this.latitude = getShopByName(this.chooseShop).latitude
    this.longitude = getShopByName(this.chooseShop).longitude
    let gcj02Position = MapUtil.convertToGcj02(this.latitude, this.longitude)

    // 地图初始化参数
    this.mapOptions = {
      position: {
        target: {
          latitude: gcj02Position.latitude,
          longitude: gcj02Position.longitude
        },
        zoom: 16,
      },
      myLocationControlsEnabled: true
    };

    this.callback = async (err, mapController) => {
      if (!err) {
        this.mapController = mapController;
        for (let i = 0; i < this.shopList.length; i++) {
          let gcj02Position = MapUtil.convertToGcj02(this.shopList[i].latitude, this.shopList[i].longitude)
          // 创建Marker
          let markerOptions: mapCommon.MarkerOptions = {
            position: {
              latitude: gcj02Position.latitude,
              longitude: gcj02Position.longitude
            },
            rotation: 0,
            visible: true,
            zIndex: 0,
            alpha: 1,
            anchorU: 0.5,
            anchorV: 1,
            clickable: true,
            draggable: true,
            flat: false
          };
          this.mapController.addMarker(markerOptions);
        }
      }
    };
  }

  build() {
    NavDestination() {
      Column() {
        // 地图
        if (this.closeMap === "收起地图") {
          Stack() {
            MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
          }.width('100%').height('40%')
        }

        Row() {
          Text(this.closeMap).fontSize(12).fontColor(Color.Gray).margin({ right: 8 })
          Image(this.closeMapImg).height(12)
        }.margin({ top: 10, bottom: 10 }).onClick(() => {
          this.closeMap = this.closeMap === "收起地图" ? "展开地图" : "收起地图"
          this.closeMapImg =
            this.closeMapImg === $r("app.media.ic_public_arrow_up_0") ? $r("app.media.ic_public_arrow_down_0") :
            $r("app.media.ic_public_arrow_up_0")
        })

        // 门店
        Scroll() {
          Column() {
            ForEach(this.shopList, (detail: ShopDetail) => {
              ListItem() {
                Stack({ alignContent: Alignment.BottomEnd }) {
                  Row() {
                    Column() {
                      Text(detail.name).width('100%')
                      Text(detail.addr).width('100%').fontColor(Color.Gray).fontSize(12).margin({ top: 5 })
                      Text("营业时间: " + detail.time)
                        .width('100%')
                        .fontColor(Color.Gray)
                        .fontSize(12)
                        .margin({ top: 5 })
                      Row() {
                        Image($r("app.media.ic_public_phone")).height(25).width(25)
                          .onClick(() => {
                            call.makeCall(detail.phone, (err: BusinessError) => {
                              if (err) {
                                console.error(`makeCall fail, err->${JSON.stringify(err)}`);
                              } else {
                                console.log(`makeCall success`);
                              }
                            });
                          })
                        Image($r("app.media.ic_public_map")).height(25).width(25).margin({ left: 20 })
                          .onClick(() => {
                            const petalMapWant: Want = {
                              bundleName: 'com.huawei.hmos.maps.app',
                              uri: 'maps://routes',
                              parameters: {
                                linkSource: 'com.other.app',
                                destinationLatitude: detail.latitude,
                                destinationLongitude: detail.longitude,
                                destinationName: detail.addr || ''
                              }
                            }
                            const context = getContext(this) as common.UIAbilityContext;
                            context.startAbility(petalMapWant);
                          })
                        if (detail.name === this.preChooseShop) {
                          Image($r('app.media.ic_public_choose_selected')).height(25).width(25).margin({ left: 20 })
                        } else {
                          Image($r('app.media.ic_public_choose')).height(25).width(25).margin({ left: 20 })
                        }
                      }.width('100%').margin({ top: 15 })
                    }.layoutWeight(5)
                    .padding(10)
                    .justifyContent(FlexAlign.Start)

                    Column() {
                      Row() {
                        Text("去下单").margin({ left: 20 })
                          .onClick(() => {
                            this.chooseShop = detail.name
                            RouterModule.push({
                              stackName: NavStackMap.MAIN_STACK,
                              url: NavRouterMap.PAGE_MAIN,
                              animateSwitch: AnimatedMap.ON,
                              param: JSON.stringify(detail.name)
                            })
                            // RouterModule.pop(NavStackMap.MAIN_STACK)
                          })
                      }.height('60%')
                      .borderWidth({ left: 2 })
                      .borderColor($r("app.color.system_bg_white"))
                    }.layoutWeight(3)
                  }
                  .borderWidth(detail.name === this.preChooseShop ? 1 : 0)
                  .borderRadius(16)
                  .borderColor($r("app.color.system_green"))
                  .backgroundColor(Color.White)
                  .height(150)
                  .margin({ bottom: 10 })
                  .onClick(() => {
                    this.preChooseShop = detail.name
                    let gcj02Position = MapUtil.convertToGcj02(detail.latitude, detail.longitude)
                    this.latitude = gcj02Position.longitude
                    this.longitude = gcj02Position.longitude
                    // 新建CameraUpdate对象
                    let cameraPosition: mapCommon.CameraPosition = {
                      target: {
                        latitude: gcj02Position.latitude,
                        longitude: gcj02Position.longitude
                      },
                      zoom: 16
                    };
                    let cameraUpdate: map.CameraUpdate = map.newCameraPosition(cameraPosition);
                    // 移动相机
                    this.mapController?.animateCamera(cameraUpdate, 1000);
                    this.mapController?.moveCamera(cameraUpdate)
                  })

                  if (detail.name === this.preChooseShop) {
                    Image($r("app.media.ic_public_choose_new")).width(50).height(50).margin({ bottom: 10, right: 1 })
                  }

                }
              }
            }, (item: ShopDetail) => JSON.stringify(item.id))
          }
        }
        .scrollable(ScrollDirection.Vertical)
        .edgeEffect(EdgeEffect.Fade)
        .layoutWeight(1)
        .width('100%')
        .backgroundColor($r("app.color.system_bg_white"))
        .padding(16)
        .scrollBar(BarState.Off)

      }.width('100%')

    }.title('选择门店').padding({ bottom: this.bottomRectHeight, top: this.topRectHeight})
  }
}