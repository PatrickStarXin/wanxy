if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageOrderPreview_Params {
    chooseTakeOutAddr?: string;
    orderType?: OrderType | undefined;
    chooseShop?: string;
    choosePrice?: number;
    buyFoods?: Map<string, FoodDetail>;
    selectedIndex?: number;
    enableLoading?: boolean;
    isTakeOut?: boolean;
    topRectHeight?: string;
    bottomRectHeight?: string;
    context?;
}
import { getBuyFoods } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_food/Index";
import type { FoodDetail } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_food/Index";
import promptAction from "@ohos:promptAction";
import { Logger, OrderType, PreferenceUtil } from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/Index";
import type preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
import { OrderDetail, OrderStatus } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_order/ets/model/OrderInfo";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@bundle:com.atomicservice.5765880207855620561/phone@router_manage/Index";
export function PageOrderPreviewBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageOrderPreview(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_order/src/main/ets/pages/PageOrderPreview.ets", line: 26, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PageOrderPreview" });
    }
}
export class PageOrderPreview extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedIndex = this.createStorageLink("selectedIndex", 0, "selectedIndex");
        this.__enableLoading = new ObservedPropertySimplePU(false, this, "enableLoading");
        this.__isTakeOut = new ObservedPropertySimplePU(false, this, "isTakeOut");
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.bottomRectHeight = AppStorage.get<number>('bottomRectHeight') + 'px';
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageOrderPreview_Params) {
        if (params.enableLoading !== undefined) {
            this.enableLoading = params.enableLoading;
        }
        if (params.isTakeOut !== undefined) {
            this.isTakeOut = params.isTakeOut;
        }
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
        if (params.bottomRectHeight !== undefined) {
            this.bottomRectHeight = params.bottomRectHeight;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: PageOrderPreview_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__chooseTakeOutAddr.purgeDependencyOnElmtId(rmElmtId);
        this.__orderType.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseShop.purgeDependencyOnElmtId(rmElmtId);
        this.__choosePrice.purgeDependencyOnElmtId(rmElmtId);
        this.__buyFoods.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__enableLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__isTakeOut.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__chooseTakeOutAddr.aboutToBeDeleted();
        this.__orderType.aboutToBeDeleted();
        this.__chooseShop.aboutToBeDeleted();
        this.__choosePrice.aboutToBeDeleted();
        this.__buyFoods.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__enableLoading.aboutToBeDeleted();
        this.__isTakeOut.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __chooseTakeOutAddr: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>("chooseTakeOutAddr", "", "chooseTakeOutAddr");
    get chooseTakeOutAddr() {
        return this.__chooseTakeOutAddr.get();
    }
    set chooseTakeOutAddr(newValue: string) {
        this.__chooseTakeOutAddr.set(newValue);
    }
    private __orderType: ObservedPropertyAbstractPU<OrderType | undefined> = this.createLocalStorageLink<OrderType | undefined>("orderType", undefined, "orderType");
    get orderType() {
        return this.__orderType.get();
    }
    set orderType(newValue: OrderType | undefined) {
        this.__orderType.set(newValue);
    }
    private __chooseShop: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>("chooseShop", "", "chooseShop");
    get chooseShop() {
        return this.__chooseShop.get();
    }
    set chooseShop(newValue: string) {
        this.__chooseShop.set(newValue);
    }
    private __choosePrice: ObservedPropertyAbstractPU<number> = this.createLocalStorageLink<number>("choosePrice", 0, "choosePrice");
    get choosePrice() {
        return this.__choosePrice.get();
    }
    set choosePrice(newValue: number) {
        this.__choosePrice.set(newValue);
    }
    private __buyFoods: ObservedPropertyAbstractPU<Map<string, FoodDetail>> = this.createLocalStorageLink<Map<string, FoodDetail>>("buyFoods", new Map<string, FoodDetail>(), "buyFoods");
    get buyFoods() {
        return this.__buyFoods.get();
    }
    set buyFoods(newValue: Map<string, FoodDetail>) {
        this.__buyFoods.set(newValue);
    }
    private __selectedIndex: ObservedPropertyAbstractPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __enableLoading: ObservedPropertySimplePU<boolean>;
    get enableLoading() {
        return this.__enableLoading.get();
    }
    set enableLoading(newValue: boolean) {
        this.__enableLoading.set(newValue);
    }
    private __isTakeOut: ObservedPropertySimplePU<boolean>;
    get isTakeOut() {
        return this.__isTakeOut.get();
    }
    set isTakeOut(newValue: boolean) {
        this.__isTakeOut.set(newValue);
    }
    private topRectHeight: string;
    private bottomRectHeight: string;
    private context;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.Bottom });
                    Stack.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(48:7)", "feature_order");
                    Stack.width('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(49:9)", "feature_order");
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 店铺
                    Row.create();
                    Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(51:11)", "feature_order");
                    // 店铺
                    Row.backgroundColor(Color.White);
                    // 店铺
                    Row.width('90%');
                    // 店铺
                    Row.margin({ top: 10, left: '5%', right: '5%' });
                    // 店铺
                    Row.padding(10);
                    // 店铺
                    Row.borderRadius(8);
                    // 店铺
                    Row.height(60);
                    // 店铺
                    Row.justifyContent(FlexAlign.SpaceBetween);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(52:13)", "feature_order");
                    Row.onClick(() => {
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.chooseShop);
                    Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(53:15)", "feature_order");
                    Text.margin({ left: 15 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217771, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Image.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(54:15)", "feature_order");
                    Image.height(15);
                    Image.width(15);
                    Image.margin({ left: 5 });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Toggle.create({ type: ToggleType.Switch, isOn: false });
                    Toggle.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(58:13)", "feature_order");
                }, Toggle);
                Toggle.pop();
                // 店铺
                Row.pop();
                // 外卖/堂食
                this.buildDineIn.bind(this)();
                this.buildTakeOut.bind(this)();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 商品列表
                    Scroll.create();
                    Scroll.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(67:11)", "feature_order");
                    // 商品列表
                    Scroll.scrollable(ScrollDirection.Vertical);
                    // 商品列表
                    Scroll.edgeEffect(EdgeEffect.Fade);
                    // 商品列表
                    Scroll.backgroundColor(Color.White);
                    // 商品列表
                    Scroll.width('90%');
                    // 商品列表
                    Scroll.margin({ top: 10, left: '5%', right: '5%' });
                    // 商品列表
                    Scroll.padding(10);
                    // 商品列表
                    Scroll.borderRadius(8);
                    // 商品列表
                    Scroll.padding(16);
                    // 商品列表
                    Scroll.scrollBar(BarState.Off);
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(68:13)", "feature_order");
                    Column.backgroundColor(Color.White);
                    Column.width('90%');
                    Column.margin({ top: 10, left: '5%', right: '5%' });
                    Column.padding(10);
                    Column.borderRadius(8);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const foodDetail = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(70:17)", "feature_order");
                            Row.height(50);
                            Row.width('100%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": -1, "type": -1, params: [foodDetail.pic], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                            Image.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(71:19)", "feature_order");
                            Image.height(50);
                            Image.objectFit(ImageFit.Fill);
                            Image.layoutWeight(1);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(72:19)", "feature_order");
                            Column.layoutWeight(6);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(73:21)", "feature_order");
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.title);
                            Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(74:23)", "feature_order");
                            Text.fontSize(16);
                            Text.fontWeight(500);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("￥" + foodDetail.price);
                            Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(75:23)", "feature_order");
                            Text.fontSize(16);
                            Text.fontWeight(500);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(78:21)", "feature_order");
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.desc);
                            Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(79:23)", "feature_order");
                            Text.fontColor(Color.Gray);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("x" + foodDetail.buyNum + "");
                            Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(80:23)", "feature_order");
                            Text.fontColor(Color.Gray);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        Column.pop();
                        Row.pop();
                    };
                    this.forEachUpdateFunction(elmtId, getBuyFoods(this.buyFoods), forEachItemGenFunction, (item: FoodDetail) => JSON.stringify(item.id), false, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                // 商品列表
                Scroll.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 提交订单
                    Row.create();
                    Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(101:9)", "feature_order");
                    // 提交订单
                    Row.height(70);
                    // 提交订单
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    // 提交订单
                    Row.borderWidth({ top: 1 });
                    // 提交订单
                    Row.borderColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    // 提交订单
                    Row.width('100%');
                    // 提交订单
                    Row.backgroundColor(Color.White);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(102:11)", "feature_order");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("待付款");
                    Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(103:13)", "feature_order");
                    Text.margin({ left: 10 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("￥" + this.choosePrice);
                    Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(104:13)", "feature_order");
                    Text.fontSize(18);
                    Text.fontWeight(500);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(107:11)", "feature_order");
                    Row.justifyContent(FlexAlign.Center);
                    Row.height('100%');
                    Row.width(100);
                    Row.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Row.onClick(async () => {
                        // 模拟付款
                        this.enableLoading = true;
                        setTimeout(() => {
                            this.enableLoading = false;
                            // 生成订单
                            let key = Date.parse(new Date().toString()) + "";
                            let value: FoodDetail[] = [];
                            this.buyFoods.forEach((detail: FoodDetail) => {
                                value.push(detail);
                            });
                            Logger.info("key is :" + key);
                            Logger.info("value is :" + JSON.stringify(value));
                            let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.order');
                            dataPreferences.putSync(key, JSON.stringify(new OrderDetail("FD" + key, this.choosePrice, this.orderType, this.chooseShop, this.chooseTakeOutAddr, key, OrderStatus.COMMITED, value)));
                            dataPreferences.flush();
                            // 清理购物车
                            this.choosePrice = 0;
                            this.buyFoods.clear();
                            // 跳转订单页
                            this.selectedIndex = 2;
                            RouterModule.push({
                                stackName: NavStackMap.MAIN_STACK,
                                url: NavRouterMap.PAGE_MAIN,
                                animateSwitch: AnimatedMap.ON,
                            });
                            PreferenceUtil.showToastMessage("下单成功");
                        }, 2000);
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
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("付款");
                    Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(108:13)", "feature_order");
                }, Text);
                Text.pop();
                Row.pop();
                // 提交订单
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    LoadingProgress.create();
                    LoadingProgress.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(168:9)", "feature_order");
                    LoadingProgress.color(Color.Gray);
                    LoadingProgress.width(100);
                    LoadingProgress.margin({ bottom: 200 });
                    LoadingProgress.visibility(this.enableLoading ? Visibility.Visible : Visibility.Hidden);
                }, LoadingProgress);
                Stack.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_order/src/main/ets/pages/PageOrderPreview" });
            NavDestination.title("订单结算");
            NavDestination.backgroundColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
            NavDestination.padding({ bottom: this.bottomRectHeight, top: this.topRectHeight });
            NavDestination.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(47:5)", "feature_order");
        }, NavDestination);
        NavDestination.pop();
    }
    buildTakeOut(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.orderType == OrderType.TAKEOUT) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(185:7)", "feature_order");
                        Column.backgroundColor(Color.White);
                        Column.width('90%');
                        Column.margin({ top: 10, left: '5%', right: '5%' });
                        Column.padding(10);
                        Column.borderRadius(8);
                        Column.height(100);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(186:9)", "feature_order");
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.padding(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("预计送达时间");
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(187:11)", "feature_order");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(188:11)", "feature_order");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("18:30");
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(189:13)", "feature_order");
                        Text.fontColor(Color.Gray);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 134217771, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                        Image.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(190:13)", "feature_order");
                        Image.height(20);
                        Image.width(20);
                        Image.margin({ left: 5 });
                    }, Image);
                    Row.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(194:9)", "feature_order");
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.padding(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("送达地址: " + this.chooseTakeOutAddr);
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(195:11)", "feature_order");
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    buildDineIn(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 外卖/堂食
            if (this.orderType == OrderType.DINE_IN) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(205:7)", "feature_order");
                        Column.backgroundColor(Color.White);
                        Column.width('90%');
                        Column.margin({ top: 10, left: '5%', right: '5%' });
                        Column.padding(10);
                        Column.borderRadius(8);
                        Column.height(100);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(206:9)", "feature_order");
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.padding(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("取餐时间");
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(207:11)", "feature_order");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(208:11)", "feature_order");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("18:30");
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(209:13)", "feature_order");
                        Text.fontColor(Color.Gray);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 134217771, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                        Image.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(210:13)", "feature_order");
                        Image.height(20);
                        Image.width(20);
                        Image.margin({ left: 5 });
                    }, Image);
                    Row.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(214:9)", "feature_order");
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.borderWidth({ top: 2 });
                        Row.borderColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(215:11)", "feature_order");
                        Row.height('100%');
                        Row.layoutWeight(1);
                        Row.justifyContent(FlexAlign.Center);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Checkbox, isOn: !this.isTakeOut });
                        Toggle.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(216:13)", "feature_order");
                        Toggle.selectedColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                        Toggle.onChange((isOn: boolean) => {
                            if (isOn) {
                                this.isTakeOut = !this.isTakeOut;
                            }
                        });
                    }, Toggle);
                    Toggle.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("店内堂食");
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(222:13)", "feature_order");
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(228:11)", "feature_order");
                        Row.layoutWeight(1);
                        Row.height('100%');
                        Row.justifyContent(FlexAlign.Center);
                        Row.borderWidth({ left: 2 });
                        Row.borderColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Checkbox, isOn: this.isTakeOut });
                        Toggle.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(229:13)", "feature_order");
                        Toggle.selectedColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                        Toggle.onChange((isOn: boolean) => {
                            if (isOn) {
                                this.isTakeOut = !this.isTakeOut;
                            }
                        });
                    }, Toggle);
                    Toggle.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("打包带走");
                        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(235:13)", "feature_order");
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    customDialogComponent(parent = null) {
        customDialogBuilder.bind(this)();
    }
    NavigationTitle(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(268:5)", "feature_order");
            Row.width('100%');
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('订单结算');
            Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(269:7)", "feature_order");
            Text.fontSize(18);
            Text.lineHeight(50);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PageOrderPreview";
    }
}
let customDialogId: number = 1;
function customDialogBuilder(parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
        Column.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(282:3)", "feature_order");
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create('Custom dialog Message');
        Text.debugLine("feature/feature_order/src/main/ets/pages/PageOrderPreview.ets(283:5)", "feature_order");
        Text.fontSize(10);
        Text.onClick(() => {
            promptAction.closeCustomDialog(customDialogId);
        });
    }, Text);
    Text.pop();
    Column.pop();
}
registerNamedRoute(() => new PageOrderPreview(undefined, {}), "", { bundleName: "com.atomicservice.5765880207855620561", moduleName: "phone", pagePath: "../../../../../feature/feature_order/src/main/ets/pages/PageOrderPreview", pageFullPath: "feature/feature_order/src/main/ets/pages/PageOrderPreview", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("PageOrderPreview", wrapBuilder(PageOrderPreviewBuilder));
    }
})();
