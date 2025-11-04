if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageFoodDetail_Params {
    foodDetail?: FoodDetail;
    buyNum?: number;
    choosePrice?: number;
    buyFoods?: Map<string, FoodDetail>;
    topRectHeight?: string;
    bottomRectHeight?: string;
}
import { addition, multiply } from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/Index";
import { NavRouterMap, NavStackMap, RouterModule } from "@bundle:com.atomicservice.5765880207855620561/phone@router_manage/Index";
import { FoodDetail } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_food/ets/model/FoodModelData";
export function PageFoodDetailBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageFoodDetail(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_food/src/main/ets/pages/PageFoodDetail.ets", line: 22, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PageFoodDetail" });
    }
}
export class PageFoodDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__foodDetail = new ObservedPropertyObjectPU(new FoodDetail(), this, "foodDetail");
        this.__buyNum = new ObservedPropertySimplePU(1, this, "buyNum");
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.bottomRectHeight = AppStorage.get<number>('bottomRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageFoodDetail_Params) {
        if (params.foodDetail !== undefined) {
            this.foodDetail = params.foodDetail;
        }
        if (params.buyNum !== undefined) {
            this.buyNum = params.buyNum;
        }
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
        if (params.bottomRectHeight !== undefined) {
            this.bottomRectHeight = params.bottomRectHeight;
        }
    }
    updateStateVars(params: PageFoodDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__foodDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__buyNum.purgeDependencyOnElmtId(rmElmtId);
        this.__choosePrice.purgeDependencyOnElmtId(rmElmtId);
        this.__buyFoods.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__foodDetail.aboutToBeDeleted();
        this.__buyNum.aboutToBeDeleted();
        this.__choosePrice.aboutToBeDeleted();
        this.__buyFoods.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __foodDetail: ObservedPropertyObjectPU<FoodDetail>;
    get foodDetail() {
        return this.__foodDetail.get();
    }
    set foodDetail(newValue: FoodDetail) {
        this.__foodDetail.set(newValue);
    }
    private __buyNum: ObservedPropertySimplePU<number>;
    get buyNum() {
        return this.__buyNum.get();
    }
    set buyNum(newValue: number) {
        this.__buyNum.set(newValue);
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
    private topRectHeight: string;
    private bottomRectHeight: string;
    aboutToAppear(): void {
        const paramList: string[] = RouterModule.getNavParam({
            stackName: NavStackMap.MAIN_STACK,
            url: NavRouterMap.PAGE_FOOD_DETAIL,
        });
        if (paramList?.length && paramList[paramList.length - 1]) {
            this.foodDetail = JSON.parse(paramList[paramList.length - 1]);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(48:7)", "feature_food");
                    Row.height('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.BottomStart });
                    Stack.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(49:9)", "feature_food");
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(50:11)", "feature_food");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": -1, "type": -1, params: [this.foodDetail.pic], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Image.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(51:13)", "feature_food");
                    Image.height('40%');
                    Image.width('100%');
                    Image.objectFit(ImageFit.Fill);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(53:13)", "feature_food");
                    Column.height('60%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.foodDetail.title);
                    Text.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(54:15)", "feature_food");
                    Text.fontSize(16);
                }, Text);
                Text.pop();
                Column.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 悬浮购物车
                    Column.create();
                    Column.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(63:11)", "feature_food");
                    // 悬浮购物车
                    Column.height(90);
                    // 悬浮购物车
                    Column.width('100%');
                    // 悬浮购物车
                    Column.padding({ left: '5%', right: '5%' });
                    // 悬浮购物车
                    Column.borderWidth({ top: 2 });
                    // 悬浮购物车
                    Column.borderColor({ "id": 134217757, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(64:13)", "feature_food");
                    Row.layoutWeight(1);
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.SpaceBetween);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('￥' + this.foodDetail.price + '');
                    Text.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(65:15)", "feature_food");
                    Text.fontSize(16);
                    Text.fontWeight(600);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(67:15)", "feature_food");
                    Row.justifyContent(FlexAlign.SpaceBetween);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217768, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Image.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(68:17)", "feature_food");
                    Image.width(25);
                    Image.height(25);
                    Image.objectFit(ImageFit.Fill);
                    Image.onClick(() => {
                        if (this.buyNum > 1) {
                            this.buyNum--;
                        }
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.buyNum + '');
                    Text.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(75:17)", "feature_food");
                    Text.fontSize(16);
                    Text.margin({ left: 10, right: 10 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217764, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Image.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(76:17)", "feature_food");
                    Image.width(25);
                    Image.height(25);
                    Image.objectFit(ImageFit.Fill);
                    Image.onClick(() => {
                        this.buyNum++;
                    });
                }, Image);
                Row.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(87:13)", "feature_food");
                    Row.justifyContent(FlexAlign.Center);
                    Row.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Row.width('100%');
                    Row.layoutWeight(1);
                    Row.borderRadius(16);
                    Row.onClick(() => {
                        this.foodDetail.buyNum = this.buyNum;
                        this.choosePrice = addition(this.choosePrice, multiply(this.foodDetail.price, this.foodDetail.buyNum));
                        let exist = this.buyFoods.get(this.foodDetail.id);
                        if (exist) {
                            exist.buyNum += this.buyNum;
                            this.buyFoods.set(this.foodDetail.id, exist);
                        }
                        else {
                            this.buyFoods.set(this.foodDetail.id, ObservedObject.GetRawObject(this.foodDetail));
                        }
                        RouterModule.pop(NavStackMap.MAIN_STACK);
                        // RouterModule.push({
                        //   stackName: NavStackMap.MAIN_STACK,
                        //   url: NavRouterMap.PAGE_MAIN,
                        //   animateSwitch: AnimatedMap.ON,
                        //   param: JSON.stringify(this.foodDetail)
                        // })
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("加入购物车");
                    Text.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(88:15)", "feature_food");
                }, Text);
                Text.pop();
                Row.pop();
                // 悬浮购物车
                Column.pop();
                Stack.pop();
                Row.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_food/src/main/ets/pages/PageFoodDetail" });
            NavDestination.title('美食详情');
            NavDestination.padding({ bottom: this.bottomRectHeight, top: this.topRectHeight });
            NavDestination.debugLine("feature/feature_food/src/main/ets/pages/PageFoodDetail.ets(47:5)", "feature_food");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("PageFoodDetail", wrapBuilder(PageFoodDetailBuilder));
    }
})();
