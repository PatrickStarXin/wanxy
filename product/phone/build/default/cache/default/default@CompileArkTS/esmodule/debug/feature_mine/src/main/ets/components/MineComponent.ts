if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineComponent_Params {
    topRectHeight?: string;
    chooseShop?: string;
    selectedIndex?: number;
    isLogin?: boolean;
    userName?: string;
    userAvatar?: string;
    userEmail?: string;
    pathStack?: NavPathStack;
    context?;
}
import { MineConfigs } from "@normalized:N&&&feature_mine/src/main/ets/model/MineConfig&1.0.0";
import type { MineConfigItem } from "@normalized:N&&&feature_mine/src/main/ets/model/MineConfig&1.0.0";
import scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import { Logger, LoginUtil, PreferenceUtil } from "@normalized:N&&&common_utils/Index&1.0.0";
import type { LoginInfo } from "@normalized:N&&&common_utils/Index&1.0.0";
import type { BusinessError as BusinessError } from "@ohos:base";
import { getShopByName } from "@normalized:N&&&feature_map/Index&1.0.0";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
import type common from "@ohos:app.ability.common";
import hilog from "@ohos:hilog";
export class MineComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.__selectedIndex = this.createStorageLink("selectedIndex", 0, "selectedIndex");
        this.__isLogin = new ObservedPropertySimplePU(false, this, "isLogin");
        this.__userName = new ObservedPropertySimplePU('', this, "userName");
        this.__userAvatar = new ObservedPropertySimplePU('', this, "userAvatar");
        this.__userEmail = new ObservedPropertySimplePU('', this, "userEmail");
        this.pathStack = new NavPathStack();
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineComponent_Params) {
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.userAvatar !== undefined) {
            this.userAvatar = params.userAvatar;
        }
        if (params.userEmail !== undefined) {
            this.userEmail = params.userEmail;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: MineComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__chooseShop.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isLogin.purgeDependencyOnElmtId(rmElmtId);
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__userAvatar.purgeDependencyOnElmtId(rmElmtId);
        this.__userEmail.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__chooseShop.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__isLogin.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__userAvatar.aboutToBeDeleted();
        this.__userEmail.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private topRectHeight: string;
    private __chooseShop: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>("chooseShop", "", "chooseShop");
    get chooseShop() {
        return this.__chooseShop.get();
    }
    set chooseShop(newValue: string) {
        this.__chooseShop.set(newValue);
    }
    private __selectedIndex: ObservedPropertyAbstractPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __isLogin: ObservedPropertySimplePU<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __userName: ObservedPropertySimplePU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __userAvatar: ObservedPropertySimplePU<string>;
    get userAvatar() {
        return this.__userAvatar.get();
    }
    set userAvatar(newValue: string) {
        this.__userAvatar.set(newValue);
    }
    private __userEmail: ObservedPropertySimplePU<string>;
    get userEmail() {
        return this.__userEmail.get();
    }
    set userEmail(newValue: string) {
        this.__userEmail.set(newValue);
    }
    private pathStack: NavPathStack; //创建并引用NavPathStack路由栈对象
    private context;
    async aboutToAppear(): Promise<void> {
        // 检查路由栈是否存在
        const mainStack = RouterModule.getStack(NavStackMap.MAIN_STACK);
        if (!mainStack) {
            console.error("MAIN_STACK 不存在!");
        }
        else {
            console.log("MAIN_STACK 存在");
        }
        await this.checkLoginStatus();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pathStack, { moduleName: "phone", pagePath: "feature/feature_mine/src/main/ets/components/MineComponent", isUserCreateStack: true });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Column.padding({ top: this.topRectHeight });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Start);
            Row.width('100%');
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("会员中心");
            Text.fontWeight(600);
            Text.fontSize(18);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 15, top: 20 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Start);
            Row.width('95%');
            Row.height(100);
            Row.backgroundColor(Color.White);
            Row.borderRadius(24);
            Row.padding({ left: 16, right: 16 });
            Row.margin({
                top: 20
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLogin) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 显示用户信息
                        Row.create();
                        // 显示用户信息
                        Row.alignItems(VerticalAlign.Top);
                        // 显示用户信息
                        Row.margin({ bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.userAvatar) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(this.userAvatar);
                                    Image.width(80);
                                    Image.height(80);
                                    Image.borderRadius(40);
                                }, Image);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // 默认头像
                                    Image.create({ "id": 134217794, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                    // 默认头像
                                    Image.width(80);
                                    // 默认头像
                                    Image.height(80);
                                    // 默认头像
                                    Image.borderRadius(40);
                                }, Image);
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.height(80);
                        Column.justifyContent(FlexAlign.SpaceBetween);
                        Column.margin({ left: 25 });
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.userName || '华为用户');
                        Text.fontSize(24);
                        Text.align(Alignment.Start);
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.userEmail) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.userEmail);
                                    Text.fontSize(14);
                                    Text.fontColor(Color.Gray);
                                    Text.align(Alignment.Start);
                                    Text.width('100%');
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    // 显示用户信息
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 显示登录按钮
                        Button.createWithLabel('华为账号登录');
                        // 显示登录按钮
                        Button.onClick(() => {
                            this.login();
                        });
                        // 显示登录按钮
                        Button.width('80%');
                        // 显示登录按钮
                        Button.height(40);
                    }, Button);
                    // 显示登录按钮
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor(Color.White);
            Column.borderRadius(24);
            Column.padding({ left: 16, right: 16 });
            Column.margin({
                top: 20
            });
            Column.width('95%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 我的，单条
                    Row.create();
                    // 我的，单条
                    Row.onClick(() => {
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
                                }
                                else {
                                    hilog.error(0x0000, 'MineComponent', 'MAIN_STACK不存在');
                                }
                            }
                            catch (error) {
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
                                }
                                else {
                                    hilog.error(0x0000, 'MineComponent', 'MAIN_STACK不存在');
                                }
                            }
                            catch (error) {
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
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                    Flex.padding({ top: 16, bottom: 16 });
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.img);
                    Image.width(20);
                    Image.height(20);
                    Image.margin({ left: 8, right: 8 });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize(16);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Image.width(20);
                    Image.height(20);
                }, Image);
                Flex.pop();
                // 我的，单条
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, MineConfigs, forEachItemGenFunction, (item: MineConfigItem) => JSON.stringify(item.index), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
        Navigation.pop();
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
        hilog.info(0x0000, '检查登录状态', 'isLogin=  %{public}s,userName=  %{public}s ,userAvatar=  %{public}s ,userEmail=  %{public}s ', this.isLogin, this.userName, this.userAvatar, this.userEmail);
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
                backgroundColor: { "id": 134217797, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
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
                }
                else {
                    PreferenceUtil.showToastMessage("未知店铺，无法识别:" + result.originalValue);
                }
                Logger.info(`Succeeded in getting ScanResult by promise with options, result is ${JSON.stringify(result)}`);
            }).catch((error: BusinessError) => {
                Logger.error(`Failed to get ScanResult by promise with options. Code:${error.code}, message: ${error.message}`);
            });
        }
        catch (error) {
            Logger.error(`Failed to start the scanning service. Code:${error.code}, message: ${error.message}`);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
