if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageAddAddress_Params {
    topRectHeight?: string;
    bottomRectHeight?: string;
    labels?: string[];
    labelSelect?: number;
    enableLoading?: boolean;
    address?: TakeOutAddressInfo;
    nameError?: string;
    phoneError?: string;
    addressDetailError?: string;
    context?;
}
import { TakeOutAddressInfo } from "@bundle:com.atomicservice.5765880207855620561/phone@feature_home/ets/model/TakeOutAddressInfo";
import { PreferenceUtil } from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/Index";
import type common from "@ohos:app.ability.common";
import type preferences from "@ohos:data.preferences";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@bundle:com.atomicservice.5765880207855620561/phone@router_manage/Index";
export function PageAddAddressBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageAddAddress(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_home/src/main/ets/pages/PageAddAddress.ets", line: 23, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PageAddAddress" });
    }
}
export class PageAddAddress extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.bottomRectHeight = AppStorage.get<number>('bottomRectHeight') + 'px';
        this.labels = ['家', '公司', '学校'];
        this.__labelSelect = new ObservedPropertySimplePU(0, this, "labelSelect");
        this.__enableLoading = new ObservedPropertySimplePU(false, this, "enableLoading");
        this.__address = new ObservedPropertyObjectPU(new TakeOutAddressInfo(), this, "address");
        this.__nameError = new ObservedPropertySimplePU('', this, "nameError");
        this.__phoneError = new ObservedPropertySimplePU('', this, "phoneError");
        this.__addressDetailError = new ObservedPropertySimplePU('', this, "addressDetailError");
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageAddAddress_Params) {
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
        if (params.bottomRectHeight !== undefined) {
            this.bottomRectHeight = params.bottomRectHeight;
        }
        if (params.labels !== undefined) {
            this.labels = params.labels;
        }
        if (params.labelSelect !== undefined) {
            this.labelSelect = params.labelSelect;
        }
        if (params.enableLoading !== undefined) {
            this.enableLoading = params.enableLoading;
        }
        if (params.address !== undefined) {
            this.address = params.address;
        }
        if (params.nameError !== undefined) {
            this.nameError = params.nameError;
        }
        if (params.phoneError !== undefined) {
            this.phoneError = params.phoneError;
        }
        if (params.addressDetailError !== undefined) {
            this.addressDetailError = params.addressDetailError;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: PageAddAddress_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__labelSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__enableLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__address.purgeDependencyOnElmtId(rmElmtId);
        this.__nameError.purgeDependencyOnElmtId(rmElmtId);
        this.__phoneError.purgeDependencyOnElmtId(rmElmtId);
        this.__addressDetailError.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__labelSelect.aboutToBeDeleted();
        this.__enableLoading.aboutToBeDeleted();
        this.__address.aboutToBeDeleted();
        this.__nameError.aboutToBeDeleted();
        this.__phoneError.aboutToBeDeleted();
        this.__addressDetailError.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private topRectHeight: string;
    private bottomRectHeight: string;
    private labels: string[];
    private __labelSelect: ObservedPropertySimplePU<number>;
    get labelSelect() {
        return this.__labelSelect.get();
    }
    set labelSelect(newValue: number) {
        this.__labelSelect.set(newValue);
    }
    private __enableLoading: ObservedPropertySimplePU<boolean>;
    get enableLoading() {
        return this.__enableLoading.get();
    }
    set enableLoading(newValue: boolean) {
        this.__enableLoading.set(newValue);
    }
    private __address: ObservedPropertyObjectPU<TakeOutAddressInfo>;
    get address() {
        return this.__address.get();
    }
    set address(newValue: TakeOutAddressInfo) {
        this.__address.set(newValue);
    }
    private __nameError: ObservedPropertySimplePU<string>;
    get nameError() {
        return this.__nameError.get();
    }
    set nameError(newValue: string) {
        this.__nameError.set(newValue);
    }
    private __phoneError: ObservedPropertySimplePU<string>;
    get phoneError() {
        return this.__phoneError.get();
    }
    set phoneError(newValue: string) {
        this.__phoneError.set(newValue);
    }
    private __addressDetailError: ObservedPropertySimplePU<string>;
    get addressDetailError() {
        return this.__addressDetailError.get();
    }
    set addressDetailError(newValue: string) {
        this.__addressDetailError.set(newValue);
    }
    private context;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(45:7)", "feature_home");
                    Column.width('90%');
                    Column.margin({ top: 20 });
                    Column.padding(10);
                    Column.backgroundColor(Color.White);
                    Column.borderRadius(8);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(47:9)", "feature_home");
                    __Row__rowCommon();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('收货人');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(48:11)", "feature_home");
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入姓名' });
                    TextInput.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(49:11)", "feature_home");
                    TextInput.showUnderline(true);
                    TextInput.underlineColor(Color.White);
                    TextInput.showError(this.nameError);
                    TextInput.layoutWeight(4);
                    TextInput.margin({ left: 5 });
                    TextInput.onChange((value: string) => {
                        this.address.name = value;
                        if (value != '') {
                            this.nameError = '';
                        }
                    });
                }, TextInput);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(64:9)", "feature_home");
                    __Row__rowCommon();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('性别');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(65:11)", "feature_home");
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([{ value: '先生' }, { value: '女士' }]);
                    Select.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(66:11)", "feature_home");
                    Select.layoutWeight(5.7);
                    Select.margin({ left: 5 });
                    Select.backgroundColor(Color.White);
                    Select.onSelect((index: number, text?: string | undefined) => {
                        this.address.sex = text === '先生';
                    });
                }, Select);
                Select.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(76:9)", "feature_home");
                    __Row__rowCommon();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('手机号');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(77:11)", "feature_home");
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入手机号' });
                    TextInput.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(78:11)", "feature_home");
                    TextInput.showUnderline(true);
                    TextInput.underlineColor(Color.White);
                    TextInput.showError(this.phoneError);
                    TextInput.layoutWeight(4);
                    TextInput.margin({ left: 5 });
                    TextInput.maxLength(11);
                    TextInput.onChange((value: string) => {
                        this.address.phone = value;
                        if (value != '') {
                            this.phoneError = '';
                        }
                    });
                }, TextInput);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Row() {
                    //   Text('地址').layoutWeight(1)
                    //   if (!this.enableLoading) {
                    //     Row() {
                    //       Text('请选择收货地址').fontColor(Color.Gray).margin({ left : 5})
                    //       Image($r('app.media.ic_public_arrow_right')).height(25).width(25).margin({ left: 5 })
                    //     }.layoutWeight(4).justifyContent(FlexAlign.Start)
                    //     .visibility(this.enableLoading ? Visibility.Hidden : Visibility.Visible)
                    //     .onClick(() => {
                    //       this.enableLoading = true
                    //     })
                    //   }
                    //   if (this.enableLoading) {
                    //     LoadingProgress()
                    //       .color(Color.Gray)
                    //       .layoutWeight(4)
                    //   }
                    //
                    // }.rowCommon()
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(114:9)", "feature_home");
                    __Row__rowCommon();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('门牌号');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(115:11)", "feature_home");
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入详细地址' });
                    TextInput.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(116:11)", "feature_home");
                    TextInput.showUnderline(true);
                    TextInput.underlineColor(Color.White);
                    TextInput.showError(this.addressDetailError);
                    TextInput.layoutWeight(4);
                    TextInput.margin({ left: 5 });
                    TextInput.onChange((value: string) => {
                        this.address.addressDetail = value;
                        if (value != '') {
                            this.addressDetailError = '';
                        }
                    });
                }, TextInput);
                // Row() {
                //   Text('地址').layoutWeight(1)
                //   if (!this.enableLoading) {
                //     Row() {
                //       Text('请选择收货地址').fontColor(Color.Gray).margin({ left : 5})
                //       Image($r('app.media.ic_public_arrow_right')).height(25).width(25).margin({ left: 5 })
                //     }.layoutWeight(4).justifyContent(FlexAlign.Start)
                //     .visibility(this.enableLoading ? Visibility.Hidden : Visibility.Visible)
                //     .onClick(() => {
                //       this.enableLoading = true
                //     })
                //   }
                //   if (this.enableLoading) {
                //     LoadingProgress()
                //       .color(Color.Gray)
                //       .layoutWeight(4)
                //   }
                //
                // }.rowCommon()
                Row.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(138:7)", "feature_home");
                    Column.width('90%');
                    Column.margin({ top: 10 });
                    Column.padding(10);
                    Column.backgroundColor(Color.White);
                    Column.borderRadius(8);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(139:9)", "feature_home");
                    __Row__rowCommon();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('标签');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(140:11)", "feature_home");
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(141:11)", "feature_home");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const label = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel(label, { type: ButtonType.Normal, stateEffect: true });
                            Button.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(143:15)", "feature_home");
                            Button.borderRadius(2);
                            Button.backgroundColor(this.labelSelect === index ? { "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" } : { "id": 134217757, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                            Button.borderColor({ "id": 134217757, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                            Button.borderWidth(1);
                            Button.fontColor(Color.Black);
                            Button.margin({ left: 10 });
                            Button.width(60);
                            Button.height(27);
                            Button.onClick(() => {
                                this.labelSelect = index;
                                this.address.label = label;
                            });
                        }, Button);
                        Button.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.labels, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
                Row.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(161:9)", "feature_home");
                    __Row__rowCommon();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('设为默认地址');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(162:11)", "feature_home");
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Toggle.create({ type: ToggleType.Switch, isOn: false });
                    Toggle.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(163:11)", "feature_home");
                    Toggle.selectedColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Toggle.switchPointColor({ "id": 125831127, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Toggle.onChange((isOn: boolean) => {
                        this.address.isDefault = isOn;
                    });
                }, Toggle);
                Toggle.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild();
                    Button.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(177:7)", "feature_home");
                    Button.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
                    Button.width('90%');
                    Button.height(40);
                    Button.margin({ top: 40 });
                    Button.onClick(() => {
                        if (!this.address.name) {
                            this.nameError = 'Error : name can not null';
                        }
                        if (!this.address.phone || this.address.phone.length != 11) {
                            this.phoneError = 'Error : phone must be 11';
                        }
                        if (!this.address.addressDetail) {
                            this.addressDetailError = 'Error : address can not null';
                        }
                        if (this.address.name && this.address.phone.length == 11 && this.address.addressDetail) {
                            let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.address');
                            dataPreferences.putSync(this.address.addressDetail, JSON.stringify(ObservedObject.GetRawObject(this.address)));
                            dataPreferences.flush();
                            RouterModule.push({
                                stackName: NavStackMap.MAIN_STACK,
                                url: NavRouterMap.PAGE_TAKE_OUT,
                                animateSwitch: AnimatedMap.ON,
                            });
                            PreferenceUtil.showToastMessage('新增成功');
                        }
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('保存');
                    Text.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(178:9)", "feature_home");
                }, Text);
                Text.pop();
                Button.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_home/src/main/ets/pages/PageAddAddress" });
            NavDestination.title('新增地址');
            NavDestination.backgroundColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
            NavDestination.padding({ bottom: this.bottomRectHeight, top: this.topRectHeight });
            NavDestination.debugLine("feature/feature_home/src/main/ets/pages/PageAddAddress.ets(43:5)", "feature_home");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Row__rowCommon(): void {
    Row.width('100%');
    Row.height(50);
    Row.justifyContent(FlexAlign.SpaceBetween);
    Row.borderWidth({ bottom: 1 });
    Row.borderColor({ "id": 134217757, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207855620561", "moduleName": "phone" });
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("PageAddAddress", wrapBuilder(PageAddAddressBuilder));
    }
})();
