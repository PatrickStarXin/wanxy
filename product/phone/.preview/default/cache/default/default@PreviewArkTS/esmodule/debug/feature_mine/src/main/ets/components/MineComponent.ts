if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineComponent_Params {
    topRectHeight?: string;
    chooseShop?: string;
    selectedIndex?: number;
    isLogin?: boolean;
}
import { MineConfigs } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_mine/ets/model/MineConfig";
import type { MineConfigItem } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_mine/ets/model/MineConfig";
import scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import { Logger, PreferenceUtil } from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/Index";
import type { BusinessError as BusinessError } from "@ohos:base";
import { getShopByName } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_map/Index";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@bundle:com.atomicservice.5765880207855620561/phone@router_manage/Index";
import authentication from "@hms:core.authentication";
import util from "@ohos:util";
export class MineComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.__selectedIndex = this.createStorageLink("selectedIndex", 0, "selectedIndex");
        this.__isLogin = new ObservedPropertySimplePU(false, this, "isLogin");
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
    }
    updateStateVars(params: MineComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__chooseShop.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isLogin.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__chooseShop.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__isLogin.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(33:5)", "feature_mine");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
            Column.padding({ top: this.topRectHeight });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(34:7)", "feature_mine");
            Row.justifyContent(FlexAlign.Start);
            Row.width('100%');
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("会员中心");
            Text.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(35:9)", "feature_mine");
            Text.fontWeight(600);
            Text.fontSize(18);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 15, top: 20 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(38:7)", "feature_mine");
            Row.justifyContent(FlexAlign.Start);
            Row.width('95%');
            Row.height(60);
            Row.backgroundColor(Color.White);
            Row.borderRadius(24);
            Row.padding({ left: 16, right: 16 });
            Row.margin({
                top: 20
            });
            Row.onClick(() => {
                if (!this.isLogin) {
                    this.login();
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217772, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
            Image.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(39:9)", "feature_mine");
            Image.width(40);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isLogin ? "已登陆" : "华为用户");
            Text.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(40:9)", "feature_mine");
            Text.fontSize(18);
            Text.margin({ left: 10 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(49:7)", "feature_mine");
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
                    Row.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(52:11)", "feature_mine");
                    // 我的，单条
                    Row.onClick(() => {
                        if (index == 1) {
                            // 定义扫码参数options
                            this.scanToShop();
                        }
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                    Flex.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(53:13)", "feature_mine");
                    Flex.padding({ top: 16, bottom: 16 });
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(54:15)", "feature_mine");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.img);
                    Image.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(55:17)", "feature_mine");
                    Image.width(20);
                    Image.height(20);
                    Image.margin({ left: 8, right: 8 });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(56:17)", "feature_mine");
                    Text.fontSize(16);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217771, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Image.debugLine("feature/feature_mine/src/main/ets/components/MineComponent.ets(59:15)", "feature_mine");
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
    }
    private login() {
        // 创建登录请求，并设置参数
        let loginRequest = new authentication.HuaweiIDProvider().createLoginWithHuaweiIDRequest();
        // false表示静默登录
        loginRequest.forceLogin = false;
        // 用于防跨站点请求伪造
        loginRequest.state = util.generateRandomUUID();
        // 执行登录请求
        try {
            let controller = new authentication.AuthenticationController();
            controller.executeRequest(loginRequest).then((response: authentication.LoginWithHuaweiIDResponse) => {
                let loginWithHuaweiIDResponse = response as authentication.LoginWithHuaweiIDResponse;
                let state = loginWithHuaweiIDResponse.state;
                if (state != undefined && loginRequest.state != state) {
                    Logger.error(`Failed to login. The state is different, response state: ${state}`);
                    return;
                }
                Logger.info('Succeeded in logging in.');
                let loginWithHuaweiIDCredential = loginWithHuaweiIDResponse.data!;
                let code = loginWithHuaweiIDCredential.authorizationCode;
                let idToken = loginWithHuaweiIDCredential.idToken;
                let openID = loginWithHuaweiIDCredential.openID;
                let unionID = loginWithHuaweiIDCredential.unionID;
                // 开发者处理code, idToken, openID, unionID
                this.isLogin = true;
            }).catch((error: BusinessError) => {
                Logger.error('Failed to login, errorCode=%{public}s, errorMsg=%{public}s', error.code.toString(), error.message);
            });
        }
        catch (error) {
            Logger.error('Failed to login, errorCode=%{public}s, errorMsg=%{public}s', error.code.toString(), error.message);
        }
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
