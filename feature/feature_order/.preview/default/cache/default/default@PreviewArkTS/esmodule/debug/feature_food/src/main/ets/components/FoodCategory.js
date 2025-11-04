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
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from '@bundle:com.atomicservice.5765880207855620561/feature_order@router_manage/Index';
import { getCategoryListByShop, getFoodListByShop } from '@bundle:com.atomicservice.5765880207855620561/feature_order@feature_food/ets/model/FoodModelData';
import abilityAccessCtrl from '@ohos:abilityAccessCtrl';
import geoLocationManager from '@ohos:geoLocationManager';
import { addition, Logger, OrderType, PermissionsUtil, PreferenceUtil, subtraction } from '@bundle:com.atomicservice.5765880207855620561/feature_order@common_utils/Index';
import { ShopDetailList } from '@bundle:com.atomicservice.5765880207855620561/feature_order@feature_map/Index';
import map from '@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map';
import { SegmentButton as SegmentButton } from '@ohos:arkui.advanced.SegmentButton';
import { SegmentButtonOptions as SegmentButtonOptions } from '@ohos:arkui.advanced.SegmentButton';
import deviceInfo from '@ohos:deviceInfo';
let permissions = ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'];
export class FoodCategory extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        // 购物车内容
        this.__choosePrice = this.createLocalStorageLink("choosePrice", 0, "choosePrice");
        this.__buyFoods = this.createLocalStorageLink("buyFoods", new Map(), "buyFoods");
        // 订单类型
        this.__chooseTakeOutAddr = this.createLocalStorageLink("chooseTakeOutAddr", "", "chooseTakeOutAddr");
        this.__orderType = this.createLocalStorageLink("orderType", undefined, "orderType");
        this.__chooseShop = this.createLocalStorageLink("chooseShop", ""
        // 当前页面信息
        , "chooseShop");
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.scroller = new Scroller();
        this.__isFoodCategoryOnShow = new SynchedPropertySimpleOneWayPU(params.isFoodCategoryOnShow, this, "isFoodCategoryOnShow");
        this.__chickShop = new ObservedPropertySimplePU(false, this, "chickShop");
        this.__foodCategoryList = new ObservedPropertyObjectPU([], this, "foodCategoryList");
        this.__foodListData = new ObservedPropertyObjectPU([], this, "foodListData");
        this.__isGetLocation = new ObservedPropertySimplePU(false, this, "isGetLocation");
        this.__timerId = new ObservedPropertyObjectPU(undefined, this, "timerId");
        this.__latitude = new ObservedPropertySimplePU(0, this, "latitude");
        this.__longitude = new ObservedPropertySimplePU(0, this, "longitude");
        this.__chooseShopDistance = new ObservedPropertySimplePU(0, this, "chooseShopDistance");
        this.__singleSelectCapsuleOptions = new ObservedPropertyObjectPU(SegmentButtonOptions.capsule({
            buttons: [{ text: '堂食' }, { text: '外卖' }],
            multiply: false,
            backgroundBlurStyle: BlurStyle.BACKGROUND_THICK,
            selectedBackgroundColor: { "id": 100663312, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" }
        }), this, "singleSelectCapsuleOptions");
        this.__singleSelectCapsuleSelectedIndexes = new ObservedPropertyObjectPU([0], this, "singleSelectCapsuleSelectedIndexes");
        this.topRectHeight = AppStorage.get('topRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isFoodCategoryOnShow", this.watchFoodCategoryOnShow);
        this.declareWatch("singleSelectCapsuleSelectedIndexes", this.onSegmentButtonChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.isFoodCategoryOnShow === undefined) {
            this.__isFoodCategoryOnShow.set(false
            // 购物车内容
            );
        }
        if (params.chickShop !== undefined) {
            this.chickShop = params.chickShop;
        }
        if (params.foodCategoryList !== undefined) {
            this.foodCategoryList = params.foodCategoryList;
        }
        if (params.foodListData !== undefined) {
            this.foodListData = params.foodListData;
        }
        if (params.isGetLocation !== undefined) {
            this.isGetLocation = params.isGetLocation;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
        if (params.chooseShopDistance !== undefined) {
            this.chooseShopDistance = params.chooseShopDistance;
        }
        if (params.singleSelectCapsuleOptions !== undefined) {
            this.singleSelectCapsuleOptions = params.singleSelectCapsuleOptions;
        }
        if (params.singleSelectCapsuleSelectedIndexes !== undefined) {
            this.singleSelectCapsuleSelectedIndexes = params.singleSelectCapsuleSelectedIndexes;
        }
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
    }
    updateStateVars(params) {
        this.__isFoodCategoryOnShow.reset(params.isFoodCategoryOnShow);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isFoodCategoryOnShow.purgeDependencyOnElmtId(rmElmtId);
        this.__choosePrice.purgeDependencyOnElmtId(rmElmtId);
        this.__buyFoods.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseTakeOutAddr.purgeDependencyOnElmtId(rmElmtId);
        this.__orderType.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseShop.purgeDependencyOnElmtId(rmElmtId);
        this.__chickShop.purgeDependencyOnElmtId(rmElmtId);
        this.__foodCategoryList.purgeDependencyOnElmtId(rmElmtId);
        this.__foodListData.purgeDependencyOnElmtId(rmElmtId);
        this.__isGetLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__timerId.purgeDependencyOnElmtId(rmElmtId);
        this.__latitude.purgeDependencyOnElmtId(rmElmtId);
        this.__longitude.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseShopDistance.purgeDependencyOnElmtId(rmElmtId);
        this.__singleSelectCapsuleOptions.purgeDependencyOnElmtId(rmElmtId);
        this.__singleSelectCapsuleSelectedIndexes.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__isFoodCategoryOnShow.aboutToBeDeleted();
        this.__choosePrice.aboutToBeDeleted();
        this.__buyFoods.aboutToBeDeleted();
        this.__chooseTakeOutAddr.aboutToBeDeleted();
        this.__orderType.aboutToBeDeleted();
        this.__chooseShop.aboutToBeDeleted();
        this.__chickShop.aboutToBeDeleted();
        this.__foodCategoryList.aboutToBeDeleted();
        this.__foodListData.aboutToBeDeleted();
        this.__isGetLocation.aboutToBeDeleted();
        this.__timerId.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__chooseShopDistance.aboutToBeDeleted();
        this.__singleSelectCapsuleOptions.aboutToBeDeleted();
        this.__singleSelectCapsuleSelectedIndexes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue) {
        this.__currentIndex.set(newValue);
    }
    get isFoodCategoryOnShow() {
        return this.__isFoodCategoryOnShow.get();
    }
    set isFoodCategoryOnShow(newValue) {
        this.__isFoodCategoryOnShow.set(newValue);
    }
    get choosePrice() {
        return this.__choosePrice.get();
    }
    set choosePrice(newValue) {
        this.__choosePrice.set(newValue);
    }
    get buyFoods() {
        return this.__buyFoods.get();
    }
    set buyFoods(newValue) {
        this.__buyFoods.set(newValue);
    }
    get chooseTakeOutAddr() {
        return this.__chooseTakeOutAddr.get();
    }
    set chooseTakeOutAddr(newValue) {
        this.__chooseTakeOutAddr.set(newValue);
    }
    get orderType() {
        return this.__orderType.get();
    }
    set orderType(newValue) {
        this.__orderType.set(newValue);
    }
    get chooseShop() {
        return this.__chooseShop.get();
    }
    set chooseShop(newValue) {
        this.__chooseShop.set(newValue);
    }
    get chickShop() {
        return this.__chickShop.get();
    }
    set chickShop(newValue) {
        this.__chickShop.set(newValue);
    }
    get foodCategoryList() {
        return this.__foodCategoryList.get();
    }
    set foodCategoryList(newValue) {
        this.__foodCategoryList.set(newValue);
    }
    get foodListData() {
        return this.__foodListData.get();
    }
    set foodListData(newValue) {
        this.__foodListData.set(newValue);
    }
    get isGetLocation() {
        return this.__isGetLocation.get();
    }
    set isGetLocation(newValue) {
        this.__isGetLocation.set(newValue);
    }
    get timerId() {
        return this.__timerId.get();
    }
    set timerId(newValue) {
        this.__timerId.set(newValue);
    }
    get latitude() {
        return this.__latitude.get();
    }
    set latitude(newValue) {
        this.__latitude.set(newValue);
    }
    get longitude() {
        return this.__longitude.get();
    }
    set longitude(newValue) {
        this.__longitude.set(newValue);
    }
    get chooseShopDistance() {
        return this.__chooseShopDistance.get();
    }
    set chooseShopDistance(newValue) {
        this.__chooseShopDistance.set(newValue);
    }
    get singleSelectCapsuleOptions() {
        return this.__singleSelectCapsuleOptions.get();
    }
    set singleSelectCapsuleOptions(newValue) {
        this.__singleSelectCapsuleOptions.set(newValue);
    }
    get singleSelectCapsuleSelectedIndexes() {
        return this.__singleSelectCapsuleSelectedIndexes.get();
    }
    set singleSelectCapsuleSelectedIndexes(newValue) {
        this.__singleSelectCapsuleSelectedIndexes.set(newValue);
    }
    async aboutToAppear() {
        if (this.orderType === undefined || this.orderType === OrderType.DINE_IN) {
            this.singleSelectCapsuleSelectedIndexes[0] = 0;
            this.orderType = OrderType.DINE_IN;
        }
        else {
            this.singleSelectCapsuleSelectedIndexes[0] = 1;
        }
        this.getLocation();
    }
    /**
     * 监测页面显示/隐藏
     */
    watchFoodCategoryOnShow() {
        if (this.isFoodCategoryOnShow) {
            this.getLocation();
        }
    }
    /**
     * 打开定位
     */
    async openLocation() {
        let atManager = abilityAccessCtrl.createAtManager();
        let context = getContext(this);
        atManager.requestPermissionOnSetting(context, permissions)
            .then((data) => {
            if (data[1] == 0) {
                this.getLocation();
                this.isGetLocation = true;
            }
        })
            .catch((err) => {
            console.error('data:' + JSON.stringify(err));
            this.checkLocationPermission();
        });
    }
    /**
     * 校验是否有权限
     */
    checkLocationPermission() {
        let permissionsUtil = new PermissionsUtil();
        permissionsUtil.checkAccessToken(permissions[1])
            .then((result) => {
            if (result == abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.getLocation();
                this.isGetLocation = true;
                clearInterval(this.timerId);
            }
            else {
                this.isGetLocation = false;
                permissionsUtil.checkPermissions(permissions);
            }
        });
    }
    // 获取当前定位
    getLocation() {
        let locationChange = (err, location) => {
            if (err) {
                this.isGetLocation = false;
                Logger.error('locationChanger: err=' + JSON.stringify(err));
            }
            if (location) {
                this.isGetLocation = true;
                Logger.info('locationChanger: location=' + JSON.stringify(location));
                this.latitude = location.latitude;
                this.longitude = location.longitude;
                this.getRecentShop();
            }
            else {
                this.isGetLocation = false;
            }
        };
        try {
            geoLocationManager.getCurrentLocation(locationChange);
        }
        catch (err) {
            Logger.error("errCode:" + JSON.stringify(err));
        }
    }
    // 获取最近的商店
    getRecentShop() {
        let shopList = ShopDetailList;
        let fromLatLng = {
            latitude: this.latitude,
            longitude: this.longitude
        };
        // 如果是第一次进来则找最近的店铺
        if (this.chooseShop == "") {
            let minDistance = 9999999999;
            let minDistanceShop = this.chooseShop;
            for (let i = 0; i < shopList.length; i++) {
                let toLatLng = {
                    latitude: shopList[i].latitude,
                    longitude: shopList[i].longitude
                };
                let distance = map.calculateDistance(fromLatLng, toLatLng);
                Logger.info("店铺【" + shopList[i].name + "】，距离当前【" + distance + "】米");
                if (distance < minDistance) {
                    minDistance = distance;
                    minDistanceShop = shopList[i].name;
                }
            }
            this.chooseShop = minDistanceShop;
            this.chooseShopDistance = minDistance;
            Logger.info("最近的店铺是【" + minDistanceShop + "】，距离当前【" + minDistance + "】米");
        }
        else {
            // 如果不是则寻找选中的店铺
            for (let i = 0; i < shopList.length; i++) {
                if (shopList[i].name == this.chooseShop) {
                    let toLatLng = {
                        latitude: shopList[i].latitude,
                        longitude: shopList[i].longitude
                    };
                    this.chooseShopDistance = map.calculateDistance(fromLatLng, toLatLng);
                }
            }
        }
        // 数据加载 todo 校验当前店铺购物车中商品是否存在
        this.foodCategoryList = getCategoryListByShop(this.chooseShop);
        this.foodListData = getFoodListByShop(this.chooseShop);
    }
    onSegmentButtonChange() {
        if (this.singleSelectCapsuleSelectedIndexes[0] === 0) {
            this.orderType = OrderType.DINE_IN;
        }
        else {
            this.orderType = OrderType.TAKEOUT;
            if (this.chooseTakeOutAddr == "") {
                RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_TAKE_OUT,
                    animateSwitch: AnimatedMap.ON,
                });
            }
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(201:7)", "feature_food");
                    Column.width('100%');
                    Column.height('calc(100% - 105vp)');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(202:9)", "feature_food");
                    Row.justifyContent(FlexAlign.Start);
                    Row.width('100%');
                    Row.height(50);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("美食列表");
                    Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(203:11)", "feature_food");
                    Text.fontWeight(600);
                    Text.fontSize(18);
                    Text.alignSelf(ItemAlign.Start);
                    Text.margin({ left: 15, top: 20 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(206:9)", "feature_food");
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.width('100%');
                    Row.height(40);
                    Row.margin({ top: 15 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.orderType === OrderType.TAKEOUT) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(208:13)", "feature_food");
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(209:15)", "feature_food");
                                Row.onClick(() => {
                                    RouterModule.push({
                                        stackName: NavStackMap.MAIN_STACK,
                                        url: NavRouterMap.PAGE_TAKE_OUT,
                                        animateSwitch: AnimatedMap.ON,
                                    });
                                });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.chooseTakeOutAddr);
                                Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(210:17)", "feature_food");
                                Text.margin({ left: 15 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 100663323, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(211:17)", "feature_food");
                                Image.height(25);
                                Image.width(25);
                                Image.margin({ left: 5 });
                            }, Image);
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(219:15)", "feature_food");
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 100663314, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(220:17)", "feature_food");
                                Image.height(15);
                                Image.width(15);
                                Image.margin({ right: 5 });
                                Image.onClick(() => {
                                    RouterModule.push({
                                        stackName: NavStackMap.MAIN_STACK,
                                        url: NavRouterMap.PAGE_SHOP_LIST,
                                        animateSwitch: AnimatedMap.ON,
                                    });
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.chooseShop + " 配送");
                                Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(228:17)", "feature_food");
                                Text.fontSize(12);
                                Text.fontColor(Color.Gray);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(233:13)", "feature_food");
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (!this.isGetLocation) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(235:17)", "feature_food");
                                            Row.justifyContent(FlexAlign.Center);
                                            Row.backgroundColor({ "id": 100663312, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                            Row.height('100%');
                                            Row.width(100);
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create("开启定位");
                                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(236:19)", "feature_food");
                                            Text.onClick(async () => {
                                                let productModelInfo = deviceInfo.productModel;
                                                if (productModelInfo === 'emulator') {
                                                    PreferenceUtil.showToastMessage('请使用真机运行');
                                                }
                                                else {
                                                    this.openLocation();
                                                }
                                            });
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(246:17)", "feature_food");
                                            Row.onClick(() => {
                                                RouterModule.push({
                                                    stackName: NavStackMap.MAIN_STACK,
                                                    url: NavRouterMap.PAGE_SHOP_LIST,
                                                    animateSwitch: AnimatedMap.ON,
                                                });
                                            });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(this.chooseShop);
                                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(247:19)", "feature_food");
                                            Text.margin({ left: 15 });
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create({ "id": 100663323, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                            Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(248:19)", "feature_food");
                                            Image.height(25);
                                            Image.width(25);
                                            Image.margin({ left: 5 });
                                        }, Image);
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create("距离您" + this.chooseShopDistance.toFixed(0) + "米");
                                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(256:17)", "feature_food");
                                            Text.fontSize(12);
                                            Text.fontColor(Color.Gray);
                                        }, Text);
                                        Text.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                            Column.pop();
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.width(100);
                    __Common__.margin({ right: 15 });
                    __Common__.onClick(() => {
                        Logger.error("$singleSelectCapsuleSelectedIndexes = " + this.singleSelectCapsuleSelectedIndexes);
                    });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SegmentButton(this, {
                                options: this.singleSelectCapsuleOptions,
                                selectedIndexes: this.__singleSelectCapsuleSelectedIndexes
                            }, undefined, elmtId, () => { }, { page: "feature/feature_food/src/main/ets/components/FoodCategory.ets", line: 262, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    options: this.singleSelectCapsuleOptions,
                                    selectedIndexes: this.singleSelectCapsuleSelectedIndexes
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                options: this.singleSelectCapsuleOptions
                            });
                        }
                    }, { name: "SegmentButton" });
                }
                __Common__.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.BottomStart });
                    Stack.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(273:9)", "feature_food");
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(274:11)", "feature_food");
                    Row.width('100%');
                    Row.layoutWeight(1);
                }, Row);
                // 左侧导航栏
                this.barBuilder.bind(this)();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 右侧详情
                    List.create({ scroller: this.scroller });
                    List.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(278:13)", "feature_food");
                    // 右侧详情
                    List.height('100%');
                    // 右侧详情
                    List.width('calc(100% - 100vp)');
                    // 右侧详情
                    List.padding(16);
                    // 右侧详情
                    List.scrollBar(BarState.Off);
                    // 右侧详情
                    List.onScrollIndex((start, end) => {
                        this.currentIndex = start;
                    });
                }, List);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
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
                                ListItem.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(280:17)", "feature_food");
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(281:19)", "feature_food");
                                }, Column);
                                this.titleBuilder.bind(this)(item);
                                this.foodListBuilder.bind(this)(item);
                                Column.pop();
                                ListItem.pop();
                            };
                            this.observeComponentCreation2(itemCreation2, ListItem);
                            ListItem.pop();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.foodCategoryList, forEachItemGenFunction, (item) => JSON.stringify(item), false, false);
                }, ForEach);
                ForEach.pop();
                // 右侧详情
                List.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.chickShop) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(299:13)", "feature_food");
                                Column.width('100%');
                                Column.backgroundColor(Color.White);
                                Column.borderRadius(8);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(300:15)", "feature_food");
                                Column.borderRadius({ topLeft: 16, topRight: 16 });
                                Column.borderWidth({ top: 0.5 });
                                Column.borderColor(Color.Gray);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(301:17)", "feature_food");
                                Row.justifyContent(FlexAlign.End);
                                Row.width('100%');
                                Row.height(40);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 100663308, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(302:19)", "feature_food");
                                Image.width(14);
                                Image.height(14);
                                Image.onClick(() => {
                                    this.buyFoods.clear();
                                    this.choosePrice = 0;
                                    this.chickShop = false;
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create("清空");
                                Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(308:19)", "feature_food");
                                Text.fontSize(14);
                                Text.margin({ left: 3, right: 8 });
                                Text.onClick(() => {
                                    this.buyFoods.clear();
                                    this.choosePrice = 0;
                                    this.chickShop = false;
                                });
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(317:17)", "feature_food");
                            }, Divider);
                            this.shopDetailBuilder.bind(this)();
                            Column.pop();
                            this.shopBuilder.bind(this)();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.shopBuilder.bind(this)();
                        });
                    }
                }, If);
                If.pop();
                Stack.pop();
                Column.pop();
            }, { moduleName: "feature_order", pagePath: "feature/feature_food/src/main/ets/components/FoodCategory" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor(Color.White);
            NavDestination.margin({ top: this.topRectHeight });
            NavDestination.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(200:5)", "feature_food");
        }, NavDestination);
        NavDestination.pop();
    }
    titleBuilder(item, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(336:5)", "feature_food");
            Row.width('100%');
            Row.padding({ top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item);
            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(337:7)", "feature_food");
            Text.fontSize(18);
            Text.fontColor({ "id": 100663312, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(338:7)", "feature_food");
        }, Blank);
        Blank.pop();
        Row.pop();
    }
    barBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(346:5)", "feature_food");
            Column.height('100%');
            Column.width(100);
            Column.backgroundColor({ "id": 100663311, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(348:9)", "feature_food");
                    Column.backgroundColor(this.currentIndex === index ? Color.White : null);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 4 });
                    Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(349:11)", "feature_food");
                    Row.onClick(() => {
                        this.currentIndex = index;
                        this.scroller.scrollToIndex(this.currentIndex);
                    });
                    Row.padding({
                        top: 20,
                        bottom: 20,
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.currentIndex === index ? { "id": 100663303, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" } : { "id": 100663299, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                    Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(350:13)", "feature_food");
                    Image.width(10);
                    Image.height(10);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(353:13)", "feature_food");
                    Text.fontColor(this.currentIndex === index ? { "id": 100663312, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" } : Color.Black);
                    Text.fontSize(12);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(364:11)", "feature_food");
                    Divider.height(1);
                }, Divider);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.foodCategoryList, forEachItemGenFunction, (item) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    foodListBuilder(category, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(372:5)", "feature_food");
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const foodDetail = _item;
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
                        ListItem.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(374:9)", "feature_food");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(375:11)", "feature_food");
                            Row.height(100);
                            Row.onClick(() => {
                                RouterModule.push({
                                    stackName: NavStackMap.MAIN_STACK,
                                    url: NavRouterMap.PAGE_FOOD_DETAIL,
                                    animateSwitch: AnimatedMap.ON,
                                    param: JSON.stringify(foodDetail)
                                });
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": -1, "type": -1, params: [foodDetail.pic], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                            Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(376:13)", "feature_food");
                            Image.height(60);
                            Image.width(60);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(377:13)", "feature_food");
                            Column.width('calc(100% - 70vp)');
                            Column.justifyContent(FlexAlign.Start);
                            Column.padding({ top: 5, bottom: 5 });
                            Column.margin({ left: 10 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.title);
                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(378:15)", "feature_food");
                            Text.fontWeight(600);
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.desc);
                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(379:15)", "feature_food");
                            Text.fontSize(12);
                            Text.fontColor({ "id": 100663310, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.label);
                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(380:15)", "feature_food");
                            Text.fontSize(12);
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(381:15)", "feature_food");
                            Row.width('100%');
                            Row.height(30);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.price + '');
                            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(382:17)", "feature_food");
                            Text.fontWeight(600);
                            Text.fontSize(16);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(384:17)", "feature_food");
                        }, Row);
                        this.buyNumBuilder.bind(this)(foodDetail);
                        Row.pop();
                        Row.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, getFoodListDataMap(this.foodListData).get(category), forEachItemGenFunction, (item) => JSON.stringify(item.id), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    shopDetailBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buyFoods.size > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(410:7)", "feature_food");
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const foodDetail = _item;
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
                                    ListItem.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(412:11)", "feature_food");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(413:13)", "feature_food");
                                        Row.width('100%');
                                        Row.height(80);
                                        Row.borderWidth({ top: 2 });
                                        Row.borderColor({ "id": 100663309, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                        Row.onClick(() => {
                                            RouterModule.push({
                                                stackName: NavStackMap.MAIN_STACK,
                                                url: NavRouterMap.PAGE_FOOD_DETAIL,
                                                animateSwitch: AnimatedMap.ON,
                                                param: JSON.stringify(foodDetail)
                                            });
                                        });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create({ "id": -1, "type": -1, params: [foodDetail.pic], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                                        Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(414:15)", "feature_food");
                                        Image.height(40);
                                        Image.width(40);
                                        Image.margin({ left: 15 });
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(415:15)", "feature_food");
                                        Column.justifyContent(FlexAlign.Start);
                                        Column.padding({ top: 5, bottom: 5 });
                                        Column.margin({ left: 10 });
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(416:17)", "feature_food");
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(foodDetail.title);
                                        Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(417:19)", "feature_food");
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(420:17)", "feature_food");
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(foodDetail.label);
                                        Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(421:19)", "feature_food");
                                        Text.fontSize(12);
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(424:17)", "feature_food");
                                        Row.width('100%');
                                        Row.height(30);
                                        Row.justifyContent(FlexAlign.SpaceBetween);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('￥' + foodDetail.price * foodDetail.buyNum + '');
                                        Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(425:19)", "feature_food");
                                        Text.fontSize(16);
                                        Text.fontWeight(600);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(427:19)", "feature_food");
                                        Row.justifyContent(FlexAlign.SpaceBetween);
                                        Row.margin({ right: 65 });
                                    }, Row);
                                    this.buyNumBuilder.bind(this)(foodDetail);
                                    Row.pop();
                                    Row.pop();
                                    Column.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getBuyFoods(this.buyFoods), forEachItemGenFunction, (item) => JSON.stringify(item.id), false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    buyNumBuilder(foodDetail, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buyFoods.get(foodDetail.id)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663320, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
                        Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(462:7)", "feature_food");
                        Image.width(25);
                        Image.height(25);
                        Image.objectFit(ImageFit.Fill);
                        Image.onClick(() => {
                            let item = this.buyFoods.get(foodDetail.id);
                            if (item) {
                                if (item.buyNum > 1) {
                                    item.buyNum--;
                                    this.buyFoods.set(foodDetail.id, item);
                                    // this.choosePrice -= foodDetail.price;
                                    this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
                                    if (this.choosePrice === 0) {
                                        this.chickShop = false;
                                    }
                                }
                                else if (item.buyNum == 1) {
                                    item.buyNum--;
                                    this.buyFoods.delete(foodDetail.id);
                                    // this.choosePrice -= foodDetail.price;
                                    this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
                                    if (this.choosePrice === 0) {
                                        this.chickShop = false;
                                    }
                                }
                                else {
                                    // 提示最低不能低于0
                                }
                            }
                        });
                    }, Image);
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
            if (this.buyFoods.get(foodDetail.id)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.buyFoods.get(foodDetail.id)?.buyNum + "");
                        Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(491:7)", "feature_food");
                        Text.fontSize(16);
                        Text.margin({ left: 10, right: 10 });
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
            Image.create({ "id": 100663316, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
            Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(494:5)", "feature_food");
            Image.width(25);
            Image.height(25);
            Image.objectFit(ImageFit.Fill);
            Image.onClick(() => {
                // this.choosePrice += foodDetail.price;
                this.choosePrice = addition(this.choosePrice, foodDetail.price);
                let item = this.buyFoods.get(foodDetail.id);
                if (item) {
                    item.buyNum++;
                    this.buyFoods.set(foodDetail.id, item);
                }
                else {
                    foodDetail.buyNum = 1;
                    this.buyFoods.set(foodDetail.id, foodDetail);
                }
            });
        }, Image);
    }
    shopBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(512:5)", "feature_food");
            Row.height(50);
            Row.width('100%');
            Row.backgroundColor(Color.White);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.borderWidth({ top: 1 });
            Row.borderColor({ "id": 100663311, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
            Row.visibility(this.choosePrice === 0 ? Visibility.Hidden : Visibility.Visible);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(513:7)", "feature_food");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663329, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
            Image.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(514:9)", "feature_food");
            Image.height(40);
            Image.width(40);
            Image.margin({ left: 15 });
            Image.onClick(() => {
                this.chickShop = !this.chickShop;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(518:9)", "feature_food");
            Text.fontSize(16);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create("￥");
            Span.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(519:11)", "feature_food");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(this.choosePrice + "");
            Span.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(520:11)", "feature_food");
        }, Span);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(524:7)", "feature_food");
            Row.justifyContent(FlexAlign.Center);
            Row.backgroundColor({ "id": 100663312, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "feature_order" });
            Row.height('80%');
            Row.width(120);
            Row.borderRadius(24);
            Row.margin({ right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("选好了");
            Text.debugLine("feature/feature_food/src/main/ets/components/FoodCategory.ets(525:9)", "feature_food");
            Text.fontColor(Color.White);
            Text.onClick(() => {
                RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_ORDER_PREVIEW,
                    animateSwitch: AnimatedMap.ON
                });
            });
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function getBuyFoods(map) {
    let foods = [];
    map.forEach((v, k) => {
        foods.push(v);
    });
    return foods;
}
function getFoodListDataMap(data) {
    const map = new Map();
    data.forEach(item => {
        map.set(item.category, item.list);
    });
    return map;
}
//# sourceMappingURL=FoodCategory.js.map