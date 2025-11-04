if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    mainNavStack?: NavPathStack;
}
import { NavRouterMap, RouterModule, NavStackMap } from "@normalized:N&&&router_manage/Index&1.0.0";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainNavStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "mainNavStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.mainNavStack !== undefined) {
            this.mainNavStack = params.mainNavStack;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainNavStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainNavStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainNavStack: ObservedPropertyObjectPU<NavPathStack>;
    get mainNavStack() {
        return this.__mainNavStack.get();
    }
    set mainNavStack(newValue: NavPathStack) {
        this.__mainNavStack.set(newValue);
    }
    aboutToAppear(): void {
        RouterModule.createStack(NavStackMap.MAIN_STACK, this.mainNavStack);
        RouterModule.replace({ stackName: NavStackMap.MAIN_STACK, url: NavRouterMap.PAGE_MAIN });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.mainNavStack, { moduleName: "phone", pagePath: "product/phone/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.hideNavBar(true);
            Navigation.hideBackButton(true);
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
            Navigation.height('100%');
            Navigation.width('100%');
        }, Navigation);
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "wanxy.food.com", moduleName: "phone", pagePath: "pages/Index", pageFullPath: "product/phone/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
