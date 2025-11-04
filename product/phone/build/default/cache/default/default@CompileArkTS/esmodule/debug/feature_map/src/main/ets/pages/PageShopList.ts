if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageShopList_Params {
    latitude?: number;
    longitude?: number;
    mapOptions?: mapCommon.MapOptions;
    mapController?: map.MapComponentController;
    callback?: AsyncCallback<map.MapComponentController>;
    closeMap?: string;
    closeMapImg?: Resource;
    shopList?: ShopDetail[];
    preChooseShop?: string;
    chooseShop?: string;
    topRectHeight?: string;
    bottomRectHeight?: string;
}
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
import map from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map";
import type mapCommon from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon";
import { MapComponent as MapComponent } from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/MapComponent";
import type { AsyncCallback as AsyncCallback } from "@ohos:base";
import type { BusinessError as BusinessError } from "@ohos:base";
import { getShopByName, ShopDetailList } from "@normalized:N&&&feature_map/src/main/ets/model/ShopModelData&1.0.0";
import type { ShopDetail } from "@normalized:N&&&feature_map/src/main/ets/model/ShopModelData&1.0.0";
import { MapUtil } from "@normalized:N&&&feature_map/src/main/ets/utils/MapUtil&1.0.0";
import type common from "@ohos:app.ability.common";
import type Want from "@ohos:app.ability.Want";
import call from "@ohos:telephony.call";
export function PageShopListBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageShopList(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_map/src/main/ets/pages/PageShopList.ets", line: 26, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PageShopList" });
    }
}
export class PageShopList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__latitude = new ObservedPropertySimplePU(0, this, "latitude");
        this.__longitude = new ObservedPropertySimplePU(0, this, "longitude");
        this.mapOptions = undefined;
        this.mapController = undefined;
        this.callback = undefined;
        this.__closeMap = new ObservedPropertySimplePU("收起地图", this, "closeMap");
        this.__closeMapImg = new ObservedPropertyObjectPU({ "id": 134217767, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }, this, "closeMapImg");
        this.__shopList = new ObservedPropertyObjectPU([], this, "shopList");
        this.__preChooseShop = new ObservedPropertySimplePU("南京雨花客厅店", this, "preChooseShop");
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.bottomRectHeight = AppStorage.get<number>('bottomRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageShopList_Params) {
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
        if (params.mapOptions !== undefined) {
            this.mapOptions = params.mapOptions;
        }
        if (params.mapController !== undefined) {
            this.mapController = params.mapController;
        }
        if (params.callback !== undefined) {
            this.callback = params.callback;
        }
        if (params.closeMap !== undefined) {
            this.closeMap = params.closeMap;
        }
        if (params.closeMapImg !== undefined) {
            this.closeMapImg = params.closeMapImg;
        }
        if (params.shopList !== undefined) {
            this.shopList = params.shopList;
        }
        if (params.preChooseShop !== undefined) {
            this.preChooseShop = params.preChooseShop;
        }
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
        if (params.bottomRectHeight !== undefined) {
            this.bottomRectHeight = params.bottomRectHeight;
        }
    }
    updateStateVars(params: PageShopList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__latitude.purgeDependencyOnElmtId(rmElmtId);
        this.__longitude.purgeDependencyOnElmtId(rmElmtId);
        this.__closeMap.purgeDependencyOnElmtId(rmElmtId);
        this.__closeMapImg.purgeDependencyOnElmtId(rmElmtId);
        this.__shopList.purgeDependencyOnElmtId(rmElmtId);
        this.__preChooseShop.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseShop.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__latitude.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__closeMap.aboutToBeDeleted();
        this.__closeMapImg.aboutToBeDeleted();
        this.__shopList.aboutToBeDeleted();
        this.__preChooseShop.aboutToBeDeleted();
        this.__chooseShop.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __latitude: ObservedPropertySimplePU<number>;
    get latitude() {
        return this.__latitude.get();
    }
    set latitude(newValue: number) {
        this.__latitude.set(newValue);
    }
    private __longitude: ObservedPropertySimplePU<number>;
    get longitude() {
        return this.__longitude.get();
    }
    set longitude(newValue: number) {
        this.__longitude.set(newValue);
    }
    private mapOptions?: mapCommon.MapOptions;
    private mapController?: map.MapComponentController;
    private callback?: AsyncCallback<map.MapComponentController>;
    private __closeMap: ObservedPropertySimplePU<string>;
    get closeMap() {
        return this.__closeMap.get();
    }
    set closeMap(newValue: string) {
        this.__closeMap.set(newValue);
    }
    private __closeMapImg: ObservedPropertyObjectPU<Resource>;
    get closeMapImg() {
        return this.__closeMapImg.get();
    }
    set closeMapImg(newValue: Resource) {
        this.__closeMapImg.set(newValue);
    }
    private __shopList: ObservedPropertyObjectPU<ShopDetail[]>;
    get shopList() {
        return this.__shopList.get();
    }
    set shopList(newValue: ShopDetail[]) {
        this.__shopList.set(newValue);
    }
    private __preChooseShop: ObservedPropertySimplePU<string>;
    get preChooseShop() {
        return this.__preChooseShop.get();
    }
    set preChooseShop(newValue: string) {
        this.__preChooseShop.set(newValue);
    }
    private __chooseShop: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>("chooseShop", "", "chooseShop");
    get chooseShop() {
        return this.__chooseShop.get();
    }
    set chooseShop(newValue: string) {
        this.__chooseShop.set(newValue);
    }
    private topRectHeight: string;
    private bottomRectHeight: string;
    aboutToAppear(): void {
        this.preChooseShop = this.chooseShop;
        // 初始化请求附近的地点
        this.shopList = ShopDetailList;
        this.latitude = getShopByName(this.chooseShop).latitude;
        this.longitude = getShopByName(this.chooseShop).longitude;
        let gcj02Position = MapUtil.convertToGcj02(this.latitude, this.longitude);
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
                    let gcj02Position = MapUtil.convertToGcj02(this.shopList[i].latitude, this.shopList[i].longitude);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 地图
                    if (this.closeMap === "收起地图") {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create();
                                Stack.width('100%');
                                Stack.height('40%');
                            }, Stack);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MapComponent(this, { mapOptions: this.mapOptions, mapCallback: this.callback }, undefined, elmtId, () => { }, { page: "feature/feature_map/src/main/ets/pages/PageShopList.ets", line: 99, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                mapOptions: this.mapOptions,
                                                mapCallback: this.callback
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "MapComponent" });
                            }
                            Stack.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.margin({ top: 10, bottom: 10 });
                    Row.onClick(() => {
                        this.closeMap = this.closeMap === "收起地图" ? "展开地图" : "收起地图";
                        this.closeMapImg =
                            this.closeMapImg === { "id": 134217767, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" } ? { "id": 134217765, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" } : { "id": 134217767, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.closeMap);
                    Text.fontSize(12);
                    Text.fontColor(Color.Gray);
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.closeMapImg);
                    Image.height(12);
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 门店
                    Scroll.create();
                    // 门店
                    Scroll.scrollable(ScrollDirection.Vertical);
                    // 门店
                    Scroll.edgeEffect(EdgeEffect.Fade);
                    // 门店
                    Scroll.layoutWeight(1);
                    // 门店
                    Scroll.width('100%');
                    // 门店
                    Scroll.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    // 门店
                    Scroll.padding(16);
                    // 门店
                    Scroll.scrollBar(BarState.Off);
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
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
                                    Stack.create({ alignContent: Alignment.BottomEnd });
                                }, Stack);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.borderWidth(detail.name === this.preChooseShop ? 1 : 0);
                                    Row.borderRadius(16);
                                    Row.borderColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                    Row.backgroundColor(Color.White);
                                    Row.height(150);
                                    Row.margin({ bottom: 10 });
                                    Row.onClick(() => {
                                        this.preChooseShop = detail.name;
                                        let gcj02Position = MapUtil.convertToGcj02(detail.latitude, detail.longitude);
                                        this.latitude = gcj02Position.longitude;
                                        this.longitude = gcj02Position.longitude;
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
                                        this.mapController?.moveCamera(cameraUpdate);
                                    });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(5);
                                    Column.padding(10);
                                    Column.justifyContent(FlexAlign.Start);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(detail.name);
                                    Text.width('100%');
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(detail.addr);
                                    Text.width('100%');
                                    Text.fontColor(Color.Gray);
                                    Text.fontSize(12);
                                    Text.margin({ top: 5 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create("营业时间: " + detail.time);
                                    Text.width('100%');
                                    Text.fontColor(Color.Gray);
                                    Text.fontSize(12);
                                    Text.margin({ top: 5 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.margin({ top: 15 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 134217775, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                    Image.height(25);
                                    Image.width(25);
                                    Image.onClick(() => {
                                        call.makeCall(detail.phone, (err: BusinessError) => {
                                            if (err) {
                                                console.error(`makeCall fail, err->${JSON.stringify(err)}`);
                                            }
                                            else {
                                                console.log(`makeCall success`);
                                            }
                                        });
                                    });
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 134217772, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                    Image.height(25);
                                    Image.width(25);
                                    Image.margin({ left: 20 });
                                    Image.onClick(() => {
                                        const petalMapWant: Want = {
                                            bundleName: 'com.huawei.hmos.maps.app',
                                            uri: 'maps://routes',
                                            parameters: {
                                                linkSource: 'com.other.app',
                                                destinationLatitude: detail.latitude,
                                                destinationLongitude: detail.longitude,
                                                destinationName: detail.addr || ''
                                            }
                                        };
                                        const context = getContext(this) as common.UIAbilityContext;
                                        context.startAbility(petalMapWant);
                                    });
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    If.create();
                                    if (detail.name === this.preChooseShop) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Image.create({ "id": 134217770, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                                Image.height(25);
                                                Image.width(25);
                                                Image.margin({ left: 20 });
                                            }, Image);
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Image.create({ "id": 134217768, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                                Image.height(25);
                                                Image.width(25);
                                                Image.margin({ left: 20 });
                                            }, Image);
                                        });
                                    }
                                }, If);
                                If.pop();
                                Row.pop();
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(3);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.height('60%');
                                    Row.borderWidth({ left: 2 });
                                    Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create("去下单");
                                    Text.margin({ left: 20 });
                                    Text.onClick(() => {
                                        this.chooseShop = detail.name;
                                        RouterModule.push({
                                            stackName: NavStackMap.MAIN_STACK,
                                            url: NavRouterMap.PAGE_MAIN,
                                            animateSwitch: AnimatedMap.ON,
                                            param: JSON.stringify(detail.name)
                                        });
                                        // RouterModule.pop(NavStackMap.MAIN_STACK)
                                    });
                                }, Text);
                                Text.pop();
                                Row.pop();
                                Column.pop();
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    If.create();
                                    if (detail.name === this.preChooseShop) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Image.create({ "id": 134217769, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                                Image.width(50);
                                                Image.height(50);
                                                Image.margin({ bottom: 10, right: 1 });
                                            }, Image);
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                        });
                                    }
                                }, If);
                                If.pop();
                                Stack.pop();
                                ListItem.pop();
                            };
                            this.observeComponentCreation2(itemCreation2, ListItem);
                            ListItem.pop();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.shopList, forEachItemGenFunction, (item: ShopDetail) => JSON.stringify(item.id), false, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                // 门店
                Scroll.pop();
                Column.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_map/src/main/ets/pages/PageShopList" });
            NavDestination.title('选择门店');
            NavDestination.padding({ bottom: this.bottomRectHeight, top: this.topRectHeight });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("PageShopList", wrapBuilder(PageShopListBuilder));
    }
})();
