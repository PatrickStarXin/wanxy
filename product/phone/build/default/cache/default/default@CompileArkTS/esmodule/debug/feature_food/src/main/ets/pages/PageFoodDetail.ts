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
import { addition, multiply } from "@normalized:N&&&common_utils/Index&1.0.0";
import { NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
import { FoodDetail } from "@normalized:N&&&feature_food/src/main/ets/model/FoodModelData&1.0.0";
import hilog from "@ohos:hilog";
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
import type common from "@ohos:app.ability.common";
export function PageFoodDetailBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PageFoodDetail(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_food/src/main/ets/pages/PageFoodDetail.ets", line: 25, col: 3 });
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
    /**
     * 获取图片数据源
     * 支持base64和resourse两种格式
     * 重复，后续换成通用接口
     */
    getImageSource(pic: string): Resource | string | PixelMap {
        if (!pic || pic.trim() === '') {
            hilog.info(0x0000, 'FoodCategory_getImageSource', '图片路径为空，使用默认图片');
            return { "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
        }
        // 如果是完整的文件路径
        if (pic.startsWith('/') || pic.startsWith('file://')) {
            hilog.info(0x0000, 'FoodCategory_getImageSource', `识别为文件路径: ${pic}`);
            try {
                // 检查文件是否存在
                const isFileExist = fileIo.accessSync(pic);
                if (isFileExist) {
                    hilog.info(0x0000, 'FoodCategory_getImageSource', `文件存在: ${pic}`);
                    // 使用 fileUri 来访问文件
                    return fileUri.getUriFromPath(pic);
                }
                else {
                    hilog.error(0x0000, 'FoodCategory_getImageSource', `文件不存在: ${pic}`);
                }
            }
            catch (err) {
                hilog.error(0x0000, 'FoodCategory_getImageSource', `文件访问失败: ${pic}, error: ${JSON.stringify(err)}`);
            }
            return { "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
        }
        // 如果是base64数据uri
        if (pic && pic.startsWith('data:image')) {
            hilog.info(0x0000, 'FoodCategory', '识别为base64图片');
            return pic;
        }
        // 如果是资源路径
        if (pic && pic.startsWith('app.media.')) {
            hilog.info(0x0000, 'FoodCategory', `识别为资源路径: ${pic}`);
            try {
                const resource = { "id": -1, "type": -1, params: [pic], "bundleName": "wanxy.food.com", "moduleName": "phone" };
                if (resource) {
                    return resource;
                }
            }
            catch (error) {
                hilog.error(0x0000, 'FoodCategory', `资源路径转换失败: ${pic}, error: ${JSON.stringify(error)}`);
            }
        }
        // 如果是文件名，没有路径分隔符
        if (pic && !pic.includes('/') && !pic.includes('\\')) {
            // 尝试构建完整路径
            try {
                const context = getContext(this) as common.Context;
                const fullPath = context.filesDir + '/' + pic;
                hilog.info(0x0000, 'FoodCategory', `构建完整文件路径: ${fullPath}`);
                return fullPath;
            }
            catch (err) {
                hilog.error(0x0000, 'FoodCategory', '构建图片路径失败: ' + JSON.stringify(err));
            }
        }
        // 返回一个展位图
        hilog.warn(0x0000, 'FoodCategory', `无法识别的图片路径格式: ${pic}`);
        return { "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.height('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.BottomStart });
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.getImageSource(this.foodDetail.pic));
                    Image.height('40%');
                    Image.width('100%');
                    Image.objectFit(ImageFit.Fill);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height('60%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.foodDetail.title);
                    Text.fontSize(16);
                }, Text);
                Text.pop();
                Column.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 悬浮购物车
                    Column.create();
                    // 悬浮购物车
                    Column.height(90);
                    // 悬浮购物车
                    Column.width('100%');
                    // 悬浮购物车
                    Column.padding({ left: '5%', right: '5%' });
                    // 悬浮购物车
                    Column.borderWidth({ top: 2 });
                    // 悬浮购物车
                    Column.borderColor({ "id": 134217758, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.layoutWeight(1);
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.SpaceBetween);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('￥' + this.foodDetail.price + '');
                    Text.fontSize(16);
                    Text.fontWeight(600);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.justifyContent(FlexAlign.SpaceBetween);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217777, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
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
                    Text.fontSize(16);
                    Text.margin({ left: 10, right: 10 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 134217764, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
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
                    Row.justifyContent(FlexAlign.Center);
                    Row.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
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
