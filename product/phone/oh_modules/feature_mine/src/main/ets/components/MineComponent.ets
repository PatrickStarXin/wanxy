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

import { MineConfigItem, MineConfigs } from '../model/MineConfig';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { Logger, LoginUtil, PreferenceUtil,LoginInfo } from 'common_utils';
import { BusinessError, osAccount } from '@kit.BasicServicesKit';
import { getShopByName } from 'feature_map';
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';
import { authentication } from '@kit.AccountKit';
import { util } from '@kit.ArkTS';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import account from '@ohos.account.osAccount';


@Component
export struct MineComponent {
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';
  @LocalStorageLink("chooseShop") chooseShop: string = ""
  @StorageLink("selectedIndex") selectedIndex: number = 0;
  @State isLogin: boolean = false;
  @State userName: string = '';
  @State userAvatar: string  = '';
  @State userEmail: string = '';
  pathStack: NavPathStack = new NavPathStack();   //创建并引用NavPathStack路由栈对象
  private context = getContext(this) as common.UIAbilityContext;

  async aboutToAppear(): Promise<void> {
    // 检查路由栈是否存在
    const mainStack = RouterModule.getStack(NavStackMap.MAIN_STACK);
    if (!mainStack) {
      console.error("MAIN_STACK 不存在!");
    } else {
      console.log("MAIN_STACK 存在");
    }
    await this.checkLoginStatus();
  }

  build() {
    Navigation(this.pathStack) {   //将路由栈对象传入Navigation组件
      Column() {
        Row() {
          Text("会员中心").fontWeight(600).fontSize(18).alignSelf(ItemAlign.Start).margin({ left: 15, top: 20 })
        }.justifyContent(FlexAlign.Start).width('100%').height(50)

        Row() {
          if (this.isLogin) {
            // 显示用户信息
            Row() {
              if (this.userAvatar) {
                Image(this.userAvatar)
                  .width(80)
                  .height(80)
                  .borderRadius(40)
                  //.margin({ bottom: 10 })
              } else {
                // 默认头像
                Image($r('app.media.tee'))
                  .width(80)
                  .height(80)
                  .borderRadius(40)
                  //.margin({ bottom: 10 })
              }
              Column() {
                Text(this.userName || '华为用户')
                  .fontSize(24)
                  .align(Alignment.Start) // 左对齐
                  .width('100%') // 占满整个Column宽度

                if (this.userEmail) {
                  Text(this.userEmail)
                    .fontSize(14)
                    .fontColor(Color.Gray)
                    .align(Alignment.Start) // 左对齐
                    .width('100%') // 占满整个Column宽度
                }
              }
              .height(80) // 与头像高度一致
              .justifyContent(FlexAlign.SpaceBetween) // 垂直方向两端对齐
              .margin({ left: 25 }) // 头像与文字之间的间距
              .alignItems(HorizontalAlign.Start) // 水平方向左对齐
            }
            .alignItems(VerticalAlign.Top) // 整个Row顶部对齐
            .margin({ bottom: 10 })
          } else {
            // 显示登录按钮
            Button('华为账号登录')
              .onClick(() => {
                this.login();
              })
              .width('80%')
              .height(40)
          }
        }
        .justifyContent(FlexAlign.Start).width('95%').height(100)
        .commonStyle()



        Column() {
          ForEach(MineConfigs, (item: MineConfigItem, index: number) => {
            // 我的，单条
            Row() {
              Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
                Row() {
                  Image(item.img).width(20).height(20).margin({ left: 8, right: 8 })
                  Text(item.title).fontSize(16)
                }

                Image($r('app.media.ic_public_arrow_right')).width(20).height(20)
              }.padding({ top: 16, bottom: 16 })
            }.onClick(() => {
              if (index == 1) {
                // 定义扫码参数options
                this.scanToShop();
              }

              if (index === 2) {
                hilog.info(0x0000, 'MineComponent', '开始跳转到食品管理页面');
                hilog.info(0x0000, 'MineComponent', `stackName: ${NavStackMap.MAIN_STACK}`);
                hilog.info(0x0000, 'MineComponent', `url: ${NavRouterMap.FOOD_MANAGE_PAGE}`);

                try {
                  // 检查路由栈是否存在
                  const mainStack = RouterModule.getStack(NavStackMap.MAIN_STACK);
                  if (mainStack) {
                    hilog.info(0x0000, 'MineComponent', 'MAIN_STACK存在，开始跳转');
                    RouterModule.push({
                      stackName: NavStackMap.MAIN_STACK,
                      url: NavRouterMap.FOOD_MANAGE_PAGE,
                      animateSwitch: AnimatedMap.ON,
                    });
                    hilog.info(0x0000, 'MineComponent', '跳转指令已发送');
                  } else {
                    hilog.error(0x0000, 'MineComponent', 'MAIN_STACK不存在');
                  }
                } catch (error) {
                  console.error("跳转失败:", JSON.stringify(error));
                  // 添加调试信息
                  console.log("stackName:", NavStackMap.MAIN_STACK);
                  console.log("url:", NavRouterMap.FOOD_MANAGE_PAGE);
                  console.log("stackMap:", RouterModule.stackMap);
                }
              }
              if (index === 3) {
                try {
                  // 检查路由栈是否存在
                  const mainStack = RouterModule.getStack(NavStackMap.MAIN_STACK);
                  if (mainStack) {
                    hilog.info(0x0000, 'MineComponent', 'MAIN_STACK存在，开始跳转');
                    RouterModule.push({
                      stackName: NavStackMap.MAIN_STACK,
                      url: NavRouterMap.ADD_FOOD_PAGE,
                      animateSwitch: AnimatedMap.ON,
                    });
                    hilog.info(0x0000, 'MineComponent', '跳转指令已发送');
                  } else {
                    hilog.error(0x0000, 'MineComponent', 'MAIN_STACK不存在');
                  }
                } catch (error) {
                  console.error("跳转失败:", JSON.stringify(error));
                  // 添加调试信息
                  console.log("stackName:", NavStackMap.MAIN_STACK);
                  console.log("url:", NavRouterMap.ADD_FOOD_PAGE);
                  console.log("stackMap:", RouterModule.stackMap);
                }

              }

              if (index === 4) {
                this.showDeleteConfirmDialog();
              }
              
            })
          }, (item: MineConfigItem) => JSON.stringify(item.index))
        }
        .commonStyle().width('95%')

      }.width('100%').height('100%').backgroundColor($r("app.color.system_bg_white")).padding({ top: this.topRectHeight })
    }


  }

  /*private login() {
    hilog.info(0x0000, 'MineComponent_login', '开始执行登录');
    // 创建授权请求，而不是登录请求
    let authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest()
    // 设置为true, 确保拉起授权界面，用户知情并同意
    authRequest.forceAuthorization = true;
    // 随机生成uuid防止csrf攻击,用于防跨站点请求伪造
    authRequest.state = util.generateRandomUUID();
    // 关键配置，申请获取用户档案信息的权限
    authRequest.scopes = ['profile'];   // 申请获取昵称，头像等基本信息
    // 执行登录请求
    try {
      // 获取上下文并创建控制器
      let context = getContext(this) as common.UIAbilityContext;
       // 创建认证控制器，执行登录请求，返回promise
      let controller = new authentication.AuthenticationController(context);  // 传入上下文
      controller.executeRequest(authRequest).then((response: authentication.AuthorizationWithHuaweiIDResponse) => {
        let authResponse = response as authentication.AuthorizationWithHuaweiIDResponse;
        let state = authResponse.state;      // 验证state
        if (state != undefined && authRequest.state != state) {
          hilog.info(0x0000, 'MineComponent_login', `授权失败，状态码不一致，响应状态: ${state}`);
          return;
        }
        hilog.info(0x0000, 'MineComponent_login', 'Succeeded in logging in.');
        let authorizationData = authResponse.data!;
        // 从授权响应中获取用户昵称和头像uri
        let nickName: string | undefined = authorizationData.nickName;
        let avatarUri: string | undefined = authorizationData.avatarUri;
        let email: string | undefined = authorizationData.email;
        let idToken: string | undefined = authorizationData.idToken;
        let openID: string | undefined = authorizationData.openID;
        let unionID: string | undefined = authorizationData.unionID;
        let authCode = authorizationData.authorizationCode;
        // 开发者处理code, idToken, openID, unionID
        if (nickName) {
          this.userName = nickName;
          hilog.info(0x0000, 'MineComponent_login', `用户昵称: ${nickName}`);
        } else {
          // 处理未获取到昵称的情况，例如使用默认名称
          hilog.warn(0x0000, 'MineComponent_login', '未获取到用户昵称');
           this.userName = '华为用户'; // 设置默认昵称
        }

        if (avatarUri) {
          this.userAvatar = avatarUri;
          hilog.info(0x0000, 'MineComponent_login', `用户头像: ${avatarUri}`);
        } else {
          // 处理未获取到昵称的情况，例如使用默认名称
          hilog.warn(0x0000, 'MineComponent_login', '未获取到用户头像');
           //this.userNickName = '华为用户'; // 设置默认昵称
        }

        if (email) {
          this.userEmail = email;
          hilog.info(0x0000, 'MineComponent_login', `用户邮箱: ${email}`);
        } else {
          // 处理未获取到昵称的情况，例如使用默认名称
          hilog.warn(0x0000, 'MineComponent_login', '未获取到用户邮箱');
          this.userEmail = '暂无'; // 设置默认昵称
        }

        this.isLogin = true
      }) .catch((error: BusinessError) => {
        hilog.error(0x0000, 'MineComponent_login', 'Failed to login1, errorCode=%{public}s, errorMsg=%{public}s', error.code.toString(), error.message);
      })
    } catch (error) {
      hilog.error(0x0000, 'MineComponent_login', 'Failed to login2, errorCode=%{public}s, errorMsg=%{public}s', error.code.toString(), error.message);
    }
  }*/

  private async login() {
    await LoginUtil.clearLoginInfo();

    const userInfo: LoginInfo = await LoginUtil.login(this.context);

    if (userInfo.isLogin) {
      // 更新UI状态
      this.isLogin = true;
      this.userName = userInfo.nickName || '华为用户';
      this.userAvatar = userInfo.avatarUri || '';
      this.userEmail = userInfo.email || '暂无';

      // 保存登录信息到本地
      await LoginUtil.saveLoginInfo(userInfo);
      await this.checkLoginStatus();

      hilog.info(0x0000, 'MineComponent_login', '登录成功，用户名: %{public}s', this.userName);
    }
    else {
      // 登录失败处理
      hilog.error(0x0000, 'MinePage', '登录失败: %{public}s', userInfo.error);
      // 可以显示错误提示
    }
  }

  // 检查登录状态
  private async checkLoginStatus() {
    const userInfo = await LoginUtil.getLoginInfo();
    hilog.info(0x0000, '检查登录状态', 'isLogin=  %{public}s,userName=  %{public}s ,userAvatar=  %{public}s ,userEmail=  %{public}s ' ,this.isLogin,this.userName,this.userAvatar,this.userEmail);
    if (userInfo.isLogin) {
      if (userInfo.isLogin) {
        this.isLogin = true;
        this.userName = userInfo.nickName || '华为用户';
        this.userAvatar = userInfo.avatarUri || '';
        this.userEmail = userInfo.email || '';
        hilog.info(0x0000, 'MinePage', '从持久化存储恢复登录状态');
      }
    }
  }

  private async loginOut() {
    this.isLogin = false;
    this.userName = '';
    this.userAvatar = '';
    this.userEmail = '';
    await LoginUtil.clearLoginInfo();
    hilog.info(0x0000, 'MinePage', '已退出登录并清除持久化存储');
  }

  /**
   * 显示删除确认对话框
   */
  showDeleteConfirmDialog() {
    AlertDialog.show({
      title: '退出登录确认',
      message: `确定要退出登录`,
      primaryButton: {
        value: '退出',
        action: () => {
          this.loginOut();
        },
        backgroundColor: $r('app.color.system_red'),
        fontColor: Color.White
      },
      secondaryButton: {
        value: '取消',
        action: () => {
          hilog.info(0x0000, 'showDeleteConfirmDialog', '用户取消删除');
        }
      }
    });
  }

  @Styles
  commonStyle() {
    .backgroundColor(Color.White)
    .borderRadius(24)
    .padding({ left: 16, right: 16 })
    .margin({
      top: 20
    })
  }

  private scanToShop() {
    let options: scanBarcode.ScanOptions = {
      scanTypes: [scanCore.ScanType.ALL],
      enableMultiMode: true,
      enableAlbum: true
    };
    try {
      // 可调用getContext接口获取当前页面关联的UIAbilityContext
      scanBarcode.startScanForResult(getContext(this), options).then((result: scanBarcode.ScanResult) => {
        // 解析码值结果跳转应用服务页
        let shopDetail = getShopByName(result.originalValue);
        if (shopDetail != undefined) {
          this.chooseShop = shopDetail.name;
          // 跳转订单页
          this.selectedIndex = 1;
          RouterModule.push({
            stackName: NavStackMap.MAIN_STACK,
            url: NavRouterMap.PAGE_MAIN,
            animateSwitch: AnimatedMap.ON,
          });
          PreferenceUtil.showToastMessage("跳转店铺成功:" + result.originalValue);
        } else {
          PreferenceUtil.showToastMessage("未知店铺，无法识别:" + result.originalValue);
        }
        Logger.info(`Succeeded in getting ScanResult by promise with options, result is ${JSON.stringify(result)}`);
      }).catch((error: BusinessError) => {
        Logger.error(`Failed to get ScanResult by promise with options. Code:${error.code}, message: ${error.message}`);
      });
    } catch (error) {
      Logger.error(`Failed to start the scanning service. Code:${error.code}, message: ${error.message}`);
    }
  }
}
