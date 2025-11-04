if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FoodDemoCard_Params {
    TITLE?: string;
    ACTION_TYPE?: string;
    ABILITY_NAME?: string;
    MESSAGE?: string;
    FULL_WIDTH_PERCENT?: string;
    FULL_HEIGHT_PERCENT?: string;
}
class FoodDemoCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.TITLE = '餐饮店';
        this.ACTION_TYPE = 'router';
        this.ABILITY_NAME = 'PhoneAbility';
        this.MESSAGE = 'add detail';
        this.FULL_WIDTH_PERCENT = '100%';
        this.FULL_HEIGHT_PERCENT = '100%';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FoodDemoCard_Params) {
        if (params.TITLE !== undefined) {
            this.TITLE = params.TITLE;
        }
        if (params.ACTION_TYPE !== undefined) {
            this.ACTION_TYPE = params.ACTION_TYPE;
        }
        if (params.ABILITY_NAME !== undefined) {
            this.ABILITY_NAME = params.ABILITY_NAME;
        }
        if (params.MESSAGE !== undefined) {
            this.MESSAGE = params.MESSAGE;
        }
        if (params.FULL_WIDTH_PERCENT !== undefined) {
            this.FULL_WIDTH_PERCENT = params.FULL_WIDTH_PERCENT;
        }
        if (params.FULL_HEIGHT_PERCENT !== undefined) {
            this.FULL_HEIGHT_PERCENT = params.FULL_HEIGHT_PERCENT;
        }
    }
    updateStateVars(params: FoodDemoCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /*
     * The title.
     */
    readonly TITLE: string;
    /*
     * The action type.
     */
    readonly ACTION_TYPE: string;
    /*
     * The ability name.
     */
    readonly ABILITY_NAME: string;
    /*
     * The message.
     */
    readonly MESSAGE: string;
    /*
     * The width percentage setting.
     */
    readonly FULL_WIDTH_PERCENT: string;
    /*
     * The height percentage setting.
     */
    readonly FULL_HEIGHT_PERCENT: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("product/phone/src/main/ets/food/pages/FoodCard.ets(45:5)", "phone");
            Row.height(this.FULL_HEIGHT_PERCENT);
            Row.onClick(() => {
                postCardAction(this, {
                    action: this.ACTION_TYPE,
                    abilityName: this.ABILITY_NAME,
                    params: {
                        message: this.MESSAGE
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/food/pages/FoodCard.ets(46:7)", "phone");
            Column.width(this.FULL_WIDTH_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217752, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
            Image.debugLine("product/phone/src/main/ets/food/pages/FoodCard.ets(47:9)", "phone");
        }, Image);
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FoodDemoCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new FoodDemoCard(undefined, {}), "com.atomicservice.5765880207855620561/phone/ets/food/pages/FoodCard");
ViewStackProcessor.StopGetAccessRecording();
