if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageTakeOut_Params {
    chooseTakeOutAddr?: string;
    orderType?: OrderType | undefined;
    selectedIndex?: number;
    addressList?: TakeOutAddressInfo[];
    topRectHeight?: string;
    bottomRectHeight?: string;
    context?;
}
import { Logger, OrderType, PreferenceUtil } from "@normalized:N&&&common_utils/Index&1.0.0";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
import type { TakeOutAddressInfo } from '../model/TakeOutAddressInfo';
import type preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
export function PageTakeOutBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageTakeOut(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_home/src/main/ets/pages/PageTakeOut.ets", line: 23, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PageTakeOut" });
    }
}
export class PageTakeOut extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedIndex = this.createStorageLink('selectedIndex', 0, "selectedIndex");
        this.__addressList = new ObservedPropertyObjectPU([], this, "addressList");
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.bottomRectHeight = AppStorage.get<number>('bottomRectHeight') + 'px';
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageTakeOut_Params) {
        if (params.addressList !== undefined) {
            this.addressList = params.addressList;
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
    updateStateVars(params: PageTakeOut_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__chooseTakeOutAddr.purgeDependencyOnElmtId(rmElmtId);
        this.__orderType.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__addressList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__chooseTakeOutAddr.aboutToBeDeleted();
        this.__orderType.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__addressList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __chooseTakeOutAddr: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>('chooseTakeOutAddr', '', "chooseTakeOutAddr");
    get chooseTakeOutAddr() {
        return this.__chooseTakeOutAddr.get();
    }
    set chooseTakeOutAddr(newValue: string) {
        this.__chooseTakeOutAddr.set(newValue);
    }
    private __orderType: ObservedPropertyAbstractPU<OrderType | undefined> = this.createLocalStorageLink<OrderType | undefined>('orderType', undefined, "orderType");
    get orderType() {
        return this.__orderType.get();
    }
    set orderType(newValue: OrderType | undefined) {
        this.__orderType.set(newValue);
    }
    private __selectedIndex: ObservedPropertyAbstractPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __addressList: ObservedPropertyObjectPU<TakeOutAddressInfo[]>;
    get addressList() {
        return this.__addressList.get();
    }
    set addressList(newValue: TakeOutAddressInfo[]) {
        this.__addressList.set(newValue);
    }
    private topRectHeight: string;
    private bottomRectHeight: string;
    private context;
    async aboutToAppear() {
        let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.address');
        let value = dataPreferences.getAllSync();
        let allKeys = Object.keys(value);
        Logger.info('getAll keys = ' + allKeys);
        Logger.info('getAll object = ' + JSON.stringify(value));
        for (let i = 0; i < allKeys.length; i++) {
            let key = allKeys[i];
            let address: TakeOutAddressInfo = JSON.parse(dataPreferences.getSync(key, '').toString());
            this.addressList.push(address);
        }
        Logger.info('addressList = ' + JSON.stringify(this.addressList));
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.BottomStart });
                    Stack.width('90%');
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create();
                    List.edgeEffect(EdgeEffect.Fade);
                    List.scrollBar(BarState.Off);
                    List.height('100%');
                }, List);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const addressInfo = _item;
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
                                    Column.height(80);
                                    Column.width('100%');
                                    Column.backgroundColor(Color.White);
                                    Column.borderRadius(8);
                                    Column.padding(10);
                                    Column.margin({ top: 20 });
                                    Column.onClick(() => {
                                        this.orderType = OrderType.TAKEOUT;
                                        this.chooseTakeOutAddr = addressInfo.addressDetail;
                                        this.selectedIndex = 1;
                                        RouterModule.push({
                                            stackName: NavStackMap.MAIN_STACK,
                                            url: NavRouterMap.PAGE_MAIN,
                                            animateSwitch: AnimatedMap.ON,
                                        });
                                        PreferenceUtil.showToastMessage('选择地址:' + this.chooseTakeOutAddr);
                                    });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.justifyContent(FlexAlign.Start);
                                    Row.layoutWeight(1);
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(addressInfo.label);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(addressInfo.addressDetail);
                                    Text.margin({ left: 5 });
                                }, Text);
                                Text.pop();
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.justifyContent(FlexAlign.Start);
                                    Row.layoutWeight(1);
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(addressInfo.name);
                                    Text.fontColor(Color.Gray);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(addressInfo.phone);
                                    Text.fontColor(Color.Gray);
                                    Text.margin({ left: 5 });
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
                    this.forEachUpdateFunction(elmtId, this.addressList, forEachItemGenFunction, (item: string) => JSON.stringify(item), true, false);
                }, ForEach);
                ForEach.pop();
                List.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild();
                    Button.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Button.width('100%');
                    Button.height(40);
                    Button.onClick(() => {
                        RouterModule.push({
                            stackName: NavStackMap.MAIN_STACK,
                            url: NavRouterMap.PAGE_ADD_ADDRESS,
                            animateSwitch: AnimatedMap.ON,
                        });
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(' + 新增地址');
                }, Text);
                Text.pop();
                Button.pop();
                Stack.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_home/src/main/ets/pages/PageTakeOut" });
            NavDestination.title('我的地址');
            NavDestination.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
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
        NavigationBuilderRegister("PageTakeOut", wrapBuilder(PageTakeOutBuilder));
    }
})();
