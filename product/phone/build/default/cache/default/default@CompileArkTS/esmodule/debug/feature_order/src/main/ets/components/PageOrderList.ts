if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageOrderList_Params {
    context?;
    scroller?: Scroller;
    orderList?: OrderDetail[];
    topRectHeight?: string;
}
import { Logger, OrderType, PreferenceUtil } from "@normalized:N&&&common_utils/Index&1.0.0";
import type common from "@ohos:app.ability.common";
import type preferences from "@ohos:data.preferences";
import { getOrderStatusName } from "@normalized:N&&&feature_order/src/main/ets/model/OrderInfo&1.0.0";
import type { OrderDetail } from "@normalized:N&&&feature_order/src/main/ets/model/OrderInfo&1.0.0";
import type { FoodDetail } from 'feature_food';
export class PageOrderList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.context = getContext(this) as common.UIAbilityContext;
        this.scroller = new Scroller();
        this.__orderList = new ObservedPropertyObjectPU([], this, "orderList");
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageOrderList_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.orderList !== undefined) {
            this.orderList = params.orderList;
        }
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
    }
    updateStateVars(params: PageOrderList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__orderList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__orderList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private context;
    private scroller: Scroller;
    private __orderList: ObservedPropertyObjectPU<OrderDetail[]>;
    get orderList() {
        return this.__orderList.get();
    }
    set orderList(newValue: OrderDetail[]) {
        this.__orderList.set(newValue);
    }
    private topRectHeight: string;
    async aboutToAppear() {
        let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.order');
        let value = dataPreferences.getAllSync();
        let allKeys = Object.keys(value);
        Logger.info('getAll keys = ' + allKeys);
        Logger.info("getAll object = " + JSON.stringify(value));
        for (let i = 0; i < allKeys.length; i++) {
            let key = allKeys[i];
            let orderDetail: OrderDetail = JSON.parse(dataPreferences.getSync(key, '').toString());
            this.orderList.push(orderDetail);
        }
        Logger.info("orderList = " + JSON.stringify(this.orderList));
    }
    initialRender() {
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
            Text.create("订单列表");
            Text.fontWeight(600);
            Text.fontSize(18);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 15, top: 20 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ scroller: this.scroller });
            List.width('100%');
            List.padding(10);
            List.scrollBar(BarState.Off);
            List.layoutWeight(1);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const detail = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.borderWidth(2);
                            Column.backgroundColor(Color.White);
                            Column.borderColor(Color.White);
                            Column.width('100%');
                            Column.margin({ bottom: 10 });
                            Column.padding(16);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.height(30);
                            Row.width('100%');
                            Row.padding({ left: 10, right: 10 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (detail.orderType === OrderType.TAKEOUT) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create("送达地址: " + detail.takeOutAddress);
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (detail.orderType === OrderType.DINE_IN) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create("下单店铺: " + detail.orderShop);
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(getOrderStatusName(detail.orderStatus));
                            Text.fontColor(Color.Gray);
                            Text.fontSize(12);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            ForEach.create();
                            const forEachItemGenFunction = _item => {
                                const item = _item;
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.height(80);
                                    Row.borderWidth({ top: 2 });
                                    Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": -1, "type": -1, params: [item.pic], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                    Image.height(40);
                                    Image.width(40);
                                    Image.margin({ left: 10 });
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.height(40);
                                    Row.justifyContent(FlexAlign.Start);
                                    Row.padding({ top: 5, bottom: 5 });
                                    Row.margin({ left: 10 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.title);
                                }, Text);
                                Text.pop();
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.label);
                                    Text.fontSize(12);
                                }, Text);
                                Text.pop();
                                Row.pop();
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('￥' + item.price);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create("共" + item.buyNum + "件");
                                }, Text);
                                Text.pop();
                                Column.pop();
                                Row.pop();
                                Row.pop();
                            };
                            this.forEachUpdateFunction(elmtId, detail.orderItem, forEachItemGenFunction, (item: FoodDetail) => JSON.stringify(item.id), false, false);
                        }, ForEach);
                        ForEach.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.margin({ bottom: 10 });
                            Row.height(30);
                            Row.padding({ left: 10, right: 10 });
                            Row.borderWidth({ top: 2 });
                            Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("下单时间：" + getFormatTime(detail.orderTime));
                            Text.fontColor(Color.Gray);
                            Text.fontSize(12);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("总计：￥" + detail.price);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.orderList, forEachItemGenFunction, (item: OrderDetail) => JSON.stringify(item.orderId), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function getFormatTime(timeStamp: string) {
    let date = new Date(Number.parseInt(timeStamp));
    return ([
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':'));
}
function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}
