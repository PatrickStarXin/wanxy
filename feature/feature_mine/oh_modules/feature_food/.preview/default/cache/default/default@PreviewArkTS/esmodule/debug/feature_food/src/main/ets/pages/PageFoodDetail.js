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
import { addition, multiply } from '@bundle:com.atomicservice.6917586311984927931/feature_food@common_utils/Index';
import { NavRouterMap, NavStackMap, RouterModule } from '@bundle:com.atomicservice.6917586311984927931/feature_food@router_manage/Index';
import { FoodDetail } from '@bundle:com.atomicservice.6917586311984927931/feature_food/ets/model/FoodModelData';
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
        this.__choosePrice = this.createLocalStorageLink("choosePrice", 0, "choosePrice");
        this.__buyFoods = this.createLocalStorageLink("buyFoods", new Map(), "buyFoods");
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__foodDetail = new ObservedPropertyObjectPU(new FoodDetail(), this, "foodDetail");
        this.__buyNum = new ObservedPropertySimplePU(1, this, "buyNum");
        this.topRectHeight = AppStorage.get('topRectHeight') + 'px';
        this.bottomRectHeight = AppStorage.get('bottomRectHeight') + 'px';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params) {
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
    updateStateVars(params) {
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
    get foodDetail() {
        return this.__foodDetail.get();
    }
    set foodDetail(newValue) {
        this.__foodDetail.set(newValue);
    }
    get buyNum() {
        return this.__buyNum.get();
    }
    set buyNum(newValue) {
        this.__buyNum.set(newValue);
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
    aboutToAppear() {
        const paramList = RouterModule.getNavParam({
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
                    Image.create({ "id": -1, "type": -1, params: [this.foodDetail.pic], "bundleName": "com.atomicservice.6917586311984927931", "moduleName": "feature_food" });
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
                    Column.borderColor({ "id": 33554445, "type": 10001, params: [], "bundleName": "com.atomicservice.6917586311984927931", "moduleName": "feature_food" });
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
                    Image.create({ "id": 33554456, "type": 20000, params: [], "bundleName": "com.atomicservice.6917586311984927931", "moduleName": "feature_food" });
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
                    Image.create({ "id": 33554452, "type": 20000, params: [], "bundleName": "com.atomicservice.6917586311984927931", "moduleName": "feature_food" });
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
                    Row.backgroundColor({ "id": 33554448, "type": 10001, params: [], "bundleName": "com.atomicservice.6917586311984927931", "moduleName": "feature_food" });
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
            }, { moduleName: "feature_food", pagePath: "feature/feature_food/src/main/ets/pages/PageFoodDetail" });
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
//# sourceMappingURL=PageFoodDetail.js.map