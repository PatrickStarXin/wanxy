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

import { addition, multiply } from 'common_utils';
import { NavRouterMap, NavStackMap, RouterModule } from 'router_manage';
import { FoodDetail } from '../model/FoodModelData';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { fileIo, fileUri } from '@kit.CoreFileKit';
import { common } from '@kit.AbilityKit';

@Builder
export function PageFoodDetailBuilder() {
  PageFoodDetail()
}


@Component
export struct PageFoodDetail {
  @State foodDetail: FoodDetail = new FoodDetail();
  @State buyNum: number = 1;
  @LocalStorageLink("choosePrice") choosePrice: number = 0;
  @LocalStorageLink("buyFoods") buyFoods: Map<string, FoodDetail> = new Map<string, FoodDetail>();
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';
  bottomRectHeight: string = AppStorage.get<number>('bottomRectHeight') + 'px';

  aboutToAppear(): void {
    const paramList: string[] = RouterModule.getNavParam({
      stackName: NavStackMap.MAIN_STACK,
      url: NavRouterMap.PAGE_FOOD_DETAIL,
    })

    if (paramList?.length && paramList[paramList.length - 1]) {
      this.foodDetail = JSON.parse(paramList[paramList.length - 1])
    }
  }
  /**
   * 获取图片数据源
   * 支持base64和resourse两种格式
   * 重复，后续换成通用接口
   */
  getImageSource(pic: string): Resource | string | PixelMap{
    if (!pic || pic.trim() === '') {
      hilog.info(0x0000, 'FoodCategory_getImageSource', '图片路径为空，使用默认图片');
      return $r("app.media.food_main");
    }
    // 如果是完整的文件路径
    if (pic.startsWith('/') || pic.startsWith('file://')){
      hilog.info(0x0000, 'FoodCategory_getImageSource', `识别为文件路径: ${pic}`);

      try {
        // 检查文件是否存在
        const isFileExist = fileIo.accessSync(pic);
        if (isFileExist) {
          hilog.info(0x0000, 'FoodCategory_getImageSource', `文件存在: ${pic}`);
          // 使用 fileUri 来访问文件
          return fileUri.getUriFromPath(pic);
        }
        else {
          hilog.error(0x0000, 'FoodCategory_getImageSource', `文件不存在: ${pic}`);
        }
      } catch (err) {
        hilog.error(0x0000, 'FoodCategory_getImageSource', `文件访问失败: ${pic}, error: ${JSON.stringify(err)}`);
      }
      return $r("app.media.food_main");
    }

    // 如果是base64数据uri
    if (pic && pic.startsWith('data:image')) {
      hilog.info(0x0000, 'FoodCategory', '识别为base64图片');
      return pic;
    }
    // 如果是资源路径
    if (pic && pic.startsWith('app.media.')) {
      hilog.info(0x0000, 'FoodCategory', `识别为资源路径: ${pic}`);
      try {
        const resource = $r(pic);
        if (resource) {
          return resource;
        }
      } catch (error) {
        hilog.error(0x0000, 'FoodCategory', `资源路径转换失败: ${pic}, error: ${JSON.stringify(error)}`);
      }
    }
    // 如果是文件名，没有路径分隔符
    if (pic && !pic.includes('/') && !pic.includes('\\')) {
      // 尝试构建完整路径
      try {
        const context = getContext(this) as common.Context;
        const fullPath = context.filesDir + '/' + pic;
        hilog.info(0x0000, 'FoodCategory', `构建完整文件路径: ${fullPath}`);
        return fullPath;
      } catch (err) {
        hilog.error(0x0000, 'FoodCategory', '构建图片路径失败: ' + JSON.stringify(err));
      }
    }

    // 返回一个展位图
    hilog.warn(0x0000, 'FoodCategory', `无法识别的图片路径格式: ${pic}`);
    return $r("app.media.food_main");
  }

  build() {
    NavDestination() {
      Row() {
        Stack({ alignContent: Alignment.BottomStart }) {
          Column() {
            Image(this.getImageSource(this.foodDetail.pic))
              .height('40%').width('100%').objectFit(ImageFit.Fill)
            Column() {
              Text(this.foodDetail.title)
                .fontSize(16)
            }.height('60%')

          }
          .width('100%')
          .height('100%')

          // 悬浮购物车
          Column() {
            Row() {
              Text('￥' + this.foodDetail.price + '').fontSize(16).fontWeight(600)

              Row() {
                Image($r('app.media.ic_public_remove'))
                  .width(25).height(25).objectFit(ImageFit.Fill)
                  .onClick(() => {
                    if (this.buyNum > 1) {
                      this.buyNum --
                    }
                  });
                Text(this.buyNum + '').fontSize(16).margin({ left: 10, right: 10 });
                Image($r('app.media.ic_public_add_norm'))
                  .width(25).height(25).objectFit(ImageFit.Fill)
                  .onClick(() => {
                    this.buyNum ++
                  })
              }.justifyContent(FlexAlign.SpaceBetween)

            }.layoutWeight(1)
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)

            Row() {
              Text("加入购物车")
            }.justifyContent(FlexAlign.Center)
            .backgroundColor($r("app.color.system_green"))
            .width('100%')
            .layoutWeight(1)
            .borderRadius(16)
            .onClick(() => {
              this.foodDetail.buyNum = this.buyNum

              this.choosePrice = addition(this.choosePrice, multiply(this.foodDetail.price, this.foodDetail.buyNum))
              let exist = this.buyFoods.get(this.foodDetail.id)
              if (exist) {
                exist.buyNum += this.buyNum
                this.buyFoods.set(this.foodDetail.id, exist)
              } else {
                this.buyFoods.set(this.foodDetail.id, this.foodDetail)
              }

              RouterModule.pop(NavStackMap.MAIN_STACK)
              // RouterModule.push({
              //   stackName: NavStackMap.MAIN_STACK,
              //   url: NavRouterMap.PAGE_MAIN,
              //   animateSwitch: AnimatedMap.ON,
              //   param: JSON.stringify(this.foodDetail)
              // })
            })

          }.height(90)
          .width('100%')
          .padding({left:'5%', right:'5%'})
          .borderWidth({ top: 2 })
          .borderColor($r("app.color.border_color"))

        }.height('100%')

      }
      .height('100%')
    }
    .title('美食详情')
    .padding({ bottom: this.bottomRectHeight, top: this.topRectHeight})
  }
}
