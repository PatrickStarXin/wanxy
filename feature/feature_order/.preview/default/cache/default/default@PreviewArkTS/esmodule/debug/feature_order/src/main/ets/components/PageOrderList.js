if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
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
import { Logger, OrderType, PreferenceUtil } from '@bundle:com.atomicservice.5765880207855620561/feature_order@common_utils/Index';
import { getOrderStatusName } from '@bundle:com.atomicservice.5765880207855620561/feature_order/ets/model/OrderInfo';
export class PageOrderList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.context = getContext(this);
        this.scroller = new Scroller();
        this.__orderList = new ObservedPropertyObjectPU([], this, "orderList");
        this.topRectHeight = AppStorage.get('topRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params) {
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
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__orderList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__orderList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get orderList() {
        return this.__orderList.get();
    }
    set orderList(newValue) {
        this.__orderList.set(newValue);
    }
    async aboutToAppear() {
        let dataPreferences = PreferenceUtil.getPreference(this.context, 'food.order');
        let value = dataPreferences.getAllSync();
        let allKeys = Object.keys(value);
        Logger.info('getAll keys = ' + allKeys);
        Logger.info("getAll object = " + JSON.stringify(value));
        for (let i = 0; i < allKeys.length; i++) {
            let key = allKeys[i];
            let orderDetail = JSON.parse(dataPreferences.getSync(key, '').toString());
            this.orderList.push(orderDetail);
        }
        Logger.info("orderList = " + JSON.stringify(this.orderList));
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(46:5)", "feature_order");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 100663311, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
            Column.padding({ top: this.topRectHeight });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(47:7)", "feature_order");
            Row.justifyContent(FlexAlign.Start);
            Row.width('100%');
            Row.height(50);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("订单列表");
            Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(48:9)", "feature_order");
            Text.fontWeight(600);
            Text.fontSize(18);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 15, top: 20 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ scroller: this.scroller });
            List.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(52:7)", "feature_order");
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
                        ListItem.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(54:11)", "feature_order");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(55:13)", "feature_order");
                            Column.borderWidth(2);
                            Column.backgroundColor(Color.White);
                            Column.borderColor(Color.White);
                            Column.width('100%');
                            Column.margin({ bottom: 10 });
                            Column.padding(16);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(57:15)", "feature_order");
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
                                        Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(59:19)", "feature_order");
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
                                        Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(62:19)", "feature_order");
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
                            Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(64:17)", "feature_order");
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
                                    Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(68:17)", "feature_order");
                                    Row.width('100%');
                                    Row.height(80);
                                    Row.borderWidth({ top: 2 });
                                    Row.borderColor({ "id": 100663311, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": -1, "type": -1, params: [item.pic], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                    Image.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(69:19)", "feature_order");
                                    Image.height(40);
                                    Image.width(40);
                                    Image.margin({ left: 10 });
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(70:19)", "feature_order");
                                    Row.height(40);
                                    Row.justifyContent(FlexAlign.Start);
                                    Row.padding({ top: 5, bottom: 5 });
                                    Row.margin({ left: 10 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(71:21)", "feature_order");
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(72:23)", "feature_order");
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.title);
                                    Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(73:25)", "feature_order");
                                }, Text);
                                Text.pop();
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(76:23)", "feature_order");
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.label);
                                    Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(77:25)", "feature_order");
                                    Text.fontSize(12);
                                }, Text);
                                Text.pop();
                                Row.pop();
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(81:21)", "feature_order");
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('￥' + item.price);
                                    Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(82:23)", "feature_order");
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create("共" + item.buyNum + "件");
                                    Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(83:23)", "feature_order");
                                }, Text);
                                Text.pop();
                                Column.pop();
                                Row.pop();
                                Row.pop();
                            };
                            this.forEachUpdateFunction(elmtId, detail.orderItem, forEachItemGenFunction, (item) => JSON.stringify(item.id), false, false);
                        }, ForEach);
                        ForEach.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(96:15)", "feature_order");
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.margin({ bottom: 10 });
                            Row.height(30);
                            Row.padding({ left: 10, right: 10 });
                            Row.borderWidth({ top: 2 });
                            Row.borderColor({ "id": 100663311, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("下单时间：" + getFormatTime(detail.orderTime));
                            Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(97:17)", "feature_order");
                            Text.fontColor(Color.Gray);
                            Text.fontSize(12);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create("总计：￥" + detail.price);
                            Text.debugLine("feature/feature_order/src/main/ets/components/PageOrderList.ets(98:17)", "feature_order");
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
            this.forEachUpdateFunction(elmtId, this.orderList, forEachItemGenFunction, (item) => JSON.stringify(item.orderId), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function getFormatTime(timeStamp) {
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
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
//# sourceMappingURL=PageOrderList.js.map