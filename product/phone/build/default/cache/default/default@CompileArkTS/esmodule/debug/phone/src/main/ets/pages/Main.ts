if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    selectedIndex?: number;
    isFoodCategoryOnShow?: boolean;
    bottomRectHeight?: string;
}
import { FoodCategory } from "@normalized:N&&&feature_food/Index&1.0.0";
import { HomeComponent } from "@normalized:N&&&feature_home/Index&1.0.0";
import { MineComponent } from "@normalized:N&&&feature_mine/Index&1.0.0";
import { PageOrderList } from "@normalized:N&&&feature_order/Index&1.0.0";
@Observed
class TabModel {
    text: string = '';
    img: string | Resource = '';
    selectImg: string | Resource = '';
    fontColor: ResourceColor = Color.Black;
    selectFontColor: ResourceColor = { "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
    constructor(text: string, img: Resource, selectImg: Resource) {
        this.text = text;
        this.img = img;
        this.selectImg = selectImg;
    }
}
export function MainPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MainPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/Main.ets", line: 38, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MainPage" });
    }
}
export class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedIndex = this.createStorageLink("selectedIndex", 0, "selectedIndex");
        this.__isFoodCategoryOnShow = new ObservedPropertySimplePU(false, this, "isFoodCategoryOnShow");
        this.bottomRectHeight = AppStorage.get<number>('bottomRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.isFoodCategoryOnShow !== undefined) {
            this.isFoodCategoryOnShow = params.isFoodCategoryOnShow;
        }
        if (params.bottomRectHeight !== undefined) {
            this.bottomRectHeight = params.bottomRectHeight;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isFoodCategoryOnShow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedIndex.aboutToBeDeleted();
        this.__isFoodCategoryOnShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedIndex: ObservedPropertyAbstractPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __isFoodCategoryOnShow: ObservedPropertySimplePU<boolean>;
    get isFoodCategoryOnShow() {
        return this.__isFoodCategoryOnShow.get();
    }
    set isFoodCategoryOnShow(newValue: boolean) {
        this.__isFoodCategoryOnShow.set(newValue);
    }
    private bottomRectHeight: string;
    tabBuilder(index: number, content: TabModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 3 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.selectedIndex === index ? content.selectImg : content.img);
            Image.width(24);
            Image.height(24);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(content.text);
            Text.fontSize(10);
            Text.fontColor(this.selectedIndex === index ? content.selectFontColor : content.fontColor);
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height('100%');
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Tabs.create({ index: this.selectedIndex });
                    Tabs.barMode(BarMode.Fixed);
                    Tabs.barPosition(BarPosition.End);
                    Tabs.barHeight(50);
                    Tabs.scrollable(false);
                    Tabs.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                    Tabs.onAnimationStart((index, targetIndex) => {
                        this.selectedIndex = targetIndex;
                    });
                }, Tabs);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new HomeComponent(this, {}, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/Main.ets", line: 65, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "HomeComponent" });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.tabBuilder.call(this, 0, new TabModel('首页', { "id": 134217744, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }, { "id": 134217745, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }));
                        } });
                    TabContent.clip(false);
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new FoodCategory(this, { isFoodCategoryOnShow: this.isFoodCategoryOnShow }, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/Main.ets", line: 69, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            isFoodCategoryOnShow: this.isFoodCategoryOnShow
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        isFoodCategoryOnShow: this.isFoodCategoryOnShow
                                    });
                                }
                            }, { name: "FoodCategory" });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.tabBuilder.call(this, 1, new TabModel('点餐', { "id": 134217742, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }, { "id": 134217743, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }));
                        } });
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new PageOrderList(this, {}, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/Main.ets", line: 73, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "PageOrderList" });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.tabBuilder.call(this, 2, new TabModel('订单', { "id": 134217748, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }, { "id": 134217749, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }));
                        } });
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new MineComponent(this, {}, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/Main.ets", line: 77, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "MineComponent" });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.tabBuilder.call(this, 3, new TabModel('我的', { "id": 134217746, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }, { "id": 134217747, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }));
                        } });
                }, TabContent);
                TabContent.pop();
                Tabs.pop();
                Column.pop();
            }, { moduleName: "phone", pagePath: "product/phone/src/main/ets/pages/Main" });
            NavDestination.hideTitleBar(true);
            NavDestination.onShown(() => {
                if (this.selectedIndex === 1) {
                    this.isFoodCategoryOnShow = true;
                }
            });
            NavDestination.onHidden(() => {
                if (this.selectedIndex === 1) {
                    this.isFoodCategoryOnShow = false;
                }
            });
            NavDestination.margin({ bottom: this.bottomRectHeight });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "wanxy.food.com", moduleName: "phone", pagePath: "pages/Main", pageFullPath: "product/phone/src/main/ets/pages/Main", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("PageMain", wrapBuilder(MainPageBuilder));
    }
})();
