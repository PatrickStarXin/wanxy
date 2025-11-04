if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeComponent_Params {
    selectedIndex?: number;
    orderType?: OrderType | undefined;
}
import { OrderType } from "@normalized:N&&&common_utils/Index&1.0.0";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
export class HomeComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedIndex = this.createStorageLink("selectedIndex", 0, "selectedIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeComponent_Params) {
    }
    updateStateVars(params: HomeComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__orderType.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedIndex.aboutToBeDeleted();
        this.__orderType.aboutToBeDeleted();
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
    private __orderType: ObservedPropertyAbstractPU<OrderType | undefined> = this.createLocalStorageLink<OrderType | undefined>("orderType", undefined, "orderType");
    get orderType() {
        return this.__orderType.get();
    }
    set orderType(newValue: OrderType | undefined) {
        this.__orderType.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.edgeEffect(EdgeEffect.Fade);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width('100%');
            Stack.height(500);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217782, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Image.width('100%');
            Image.height('100%');
            Image.objectFit(ImageFit.Fill);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: 55 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ left: 70 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('单单立减 随机免单');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ left: 70 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('*具体规则见活动详情页面');
            Text.fontSize(10);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding(15);
            Row.width('100%');
            Row.margin({ top: 130 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("会员活动");
            Text.fontWeight(500);
            Text.fontSize(18);
            Text.margin({ left: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("更多");
            Text.margin({ left: 15 });
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
            Image.create({ "id": 134217781, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Image.width('90%');
        }, Image);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(230);
            Column.width('90%');
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.margin({ top: 220 });
            Column.padding(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.height(30);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217763, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Image.height(30);
            Image.width(30);
            Image.margin({ left: 5 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("鸿蒙用户");
            Text.margin({ left: 5 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Button.width(120);
            Button.height(30);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("领取会员福利");
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.rowsTemplate('1fr');
            Grid.columnsTemplate('1fr  1fr');
            Grid.height(140);
            Grid.margin({ top: 20 });
            Grid.width('100%');
            Grid.columnsGap(10);
        }, Grid);
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                GridItem.height('100%');
                GridItem.width(150);
                GridItem.borderRadius(8);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        RouterModule.push({
                            stackName: NavStackMap.MAIN_STACK,
                            url: NavRouterMap.PAGE_TAKE_OUT,
                            animateSwitch: AnimatedMap.ON,
                        });
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217784, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Image.height(100);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("外卖");
                    Text.fontWeight(50);
                }, Text);
                Text.pop();
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                GridItem.height('100%');
                GridItem.width(150);
                GridItem.borderRadius(8);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        this.orderType = OrderType.DINE_IN;
                        this.selectedIndex = 1;
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217783, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Image.height(100);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("堂食");
                    Text.fontWeight(50);
                }, Text);
                Text.pop();
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
        Column.pop();
        Stack.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
