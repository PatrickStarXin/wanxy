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
import { getBuyFoods } from "@normalized:N&&&feature_food/Index&1.0.0";
import type { FoodDetail } from "@normalized:N&&&feature_food/Index&1.0.0";
import promptAction from "@ohos:promptAction";
import { Logger, OrderType, PreferenceUtil } from "@normalized:N&&&common_utils/Index&1.0.0";
import type preferences from "@ohos:data.preferences";
import type relationalStore from "@ohos:data.relationalStore";
import type common from "@ohos:app.ability.common";
import { OrderDetail, OrderStatus } from "@normalized:N&&&feature_order/src/main/ets/model/OrderInfo&1.0.0";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
import DatabaseService from "@normalized:N&&&common_utils/Index&1.0.0";
import hilog from "@ohos:hilog";
export function PageOrderPreviewBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageOrderPreview(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_order/src/main/ets/pages/PageOrderPreview.ets", line: 29, col: 3 });
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
                    Stack.width('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 店铺
                    Row.create();
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
                    Row.onClick(() => {
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.chooseShop);
                    Text.margin({ left: 15 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Image.height(15);
                    Image.width(15);
                    Image.margin({ left: 5 });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Toggle.create({ type: ToggleType.Switch, isOn: false });
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
                            Row.height(50);
                            Row.width('100%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": -1, "type": -1, params: [foodDetail.pic], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                            Image.height(50);
                            Image.objectFit(ImageFit.Fill);
                            Image.layoutWeight(1);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.layoutWeight(6);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.title);
                            Text.fontSize(16);
                            Text.fontWeight(500);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("￥" + foodDetail.price);
                            Text.fontSize(16);
                            Text.fontWeight(500);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.desc);
                            Text.fontColor(Color.Gray);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("x" + foodDetail.buyNum + "");
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
                    // 提交订单
                    Row.height(70);
                    // 提交订单
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    // 提交订单
                    Row.borderWidth({ top: 1 });
                    // 提交订单
                    Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    // 提交订单
                    Row.width('100%');
                    // 提交订单
                    Row.backgroundColor(Color.White);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("待付款");
                    Text.margin({ left: 10 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("￥" + this.choosePrice);
                    Text.fontSize(18);
                    Text.fontWeight(500);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.justifyContent(FlexAlign.Center);
                    Row.height('100%');
                    Row.width(100);
                    Row.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Row.onClick(async () => {
                        // 模拟付款
                        this.enableLoading = true;
                        setTimeout(() => {
                            this.enableLoading = false;
                            // 插入订单信息
                            let orderTime = Date.parse(new Date().toString()) + "";
                            this.saveOrderInfo(orderTime, this.chooseShop);
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
                }, Text);
                Text.pop();
                Row.pop();
                // 提交订单
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    LoadingProgress.create();
                    LoadingProgress.color(Color.Gray);
                    LoadingProgress.width(100);
                    LoadingProgress.margin({ bottom: 200 });
                    LoadingProgress.visibility(this.enableLoading ? Visibility.Visible : Visibility.Hidden);
                }, LoadingProgress);
                Stack.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_order/src/main/ets/pages/PageOrderPreview" });
            NavDestination.title("订单结算");
            NavDestination.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            NavDestination.padding({ bottom: this.bottomRectHeight, top: this.topRectHeight });
        }, NavDestination);
        NavDestination.pop();
    }
    async saveOrderInfo(orderTime: string, storeName: string) {
        try {
            // 遍历购买的商品，为每个商品插入一条记录
            for (let entry of this.buyFoods.entries()) {
                let foodId = entry[0]; // 第一个元素是键（foodId）
                let foodDetail = entry[1]; // 第二个元素是值（FoodDetail对象）
                const valuesBucket: relationalStore.ValuesBucket = {
                    ORDER_NO: "FD" + orderTime,
                    FOOD_ID: parseInt(foodId),
                    ORDER_QUANTITY: foodDetail.buyNum,
                    ORDER_TIME: parseInt(orderTime),
                    STORE_NAME: storeName // 店铺名称
                };
                const rowId = await DatabaseService.commonInsert('ORDER_INFO', valuesBucket);
                if (rowId === -1) {
                    hilog.error(0x0000, 'PageOrderPreview_saveOrderInfo', `插入订单商品失败: 食物ID=${foodId}`);
                }
                else {
                    hilog.info(0x0000, 'PageOrderPreview_saveOrderInfo', `订单商品插入成功: 行ID=${rowId},订单号=${"FD" + orderTime}, 食物ID=${foodId}, 数量=${foodDetail.buyNum}`);
                }
            }
        }
        catch (err) {
            hilog.error(0x0000, 'PageOrderPreview_saveOrderInfo', '保存订单信息失败: ' + err);
            // 可以根据需要抛出错误或返回错误状态
        }
    }
    buildTakeOut(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.orderType == OrderType.TAKEOUT) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.backgroundColor(Color.White);
                        Column.width('90%');
                        Column.margin({ top: 10, left: '5%', right: '5%' });
                        Column.padding(10);
                        Column.borderRadius(8);
                        Column.height(100);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.padding(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("预计送达时间");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("18:30");
                        Text.fontColor(Color.Gray);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                        Image.height(20);
                        Image.width(20);
                        Image.margin({ left: 5 });
                    }, Image);
                    Row.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.padding(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("送达地址: " + this.chooseTakeOutAddr);
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
                        Column.backgroundColor(Color.White);
                        Column.width('90%');
                        Column.margin({ top: 10, left: '5%', right: '5%' });
                        Column.padding(10);
                        Column.borderRadius(8);
                        Column.height(100);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.padding(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("取餐时间");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("18:30");
                        Text.fontColor(Color.Gray);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                        Image.height(20);
                        Image.width(20);
                        Image.margin({ left: 5 });
                    }, Image);
                    Row.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.layoutWeight(1);
                        Row.borderWidth({ top: 2 });
                        Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.height('100%');
                        Row.layoutWeight(1);
                        Row.justifyContent(FlexAlign.Center);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Checkbox, isOn: !this.isTakeOut });
                        Toggle.selectedColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                        Toggle.onChange((isOn: boolean) => {
                            if (isOn) {
                                this.isTakeOut = !this.isTakeOut;
                            }
                        });
                    }, Toggle);
                    Toggle.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("店内堂食");
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.layoutWeight(1);
                        Row.height('100%');
                        Row.justifyContent(FlexAlign.Center);
                        Row.borderWidth({ left: 2 });
                        Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Checkbox, isOn: this.isTakeOut });
                        Toggle.selectedColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                        Toggle.onChange((isOn: boolean) => {
                            if (isOn) {
                                this.isTakeOut = !this.isTakeOut;
                            }
                        });
                    }, Toggle);
                    Toggle.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("打包带走");
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
            Row.width('100%');
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('订单结算');
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
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create('Custom dialog Message');
        Text.fontSize(10);
        Text.onClick(() => {
            promptAction.closeCustomDialog(customDialogId);
        });
    }, Text);
    Text.pop();
    Column.pop();
}
registerNamedRoute(() => new PageOrderPreview(undefined, {}), "", { bundleName: "wanxy.food.com", moduleName: "phone", pagePath: "../../../../../feature/feature_order/src/main/ets/pages/PageOrderPreview", pageFullPath: "feature/feature_order/src/main/ets/pages/PageOrderPreview", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("PageOrderPreview", wrapBuilder(PageOrderPreviewBuilder));
    }
})();
