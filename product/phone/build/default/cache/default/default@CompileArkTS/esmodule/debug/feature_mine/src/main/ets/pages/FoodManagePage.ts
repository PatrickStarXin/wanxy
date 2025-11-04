if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FoodManagePage_Params {
    foodListData?: FoodDetail[];
    isLoading?: boolean;
    loadError?: boolean;
    deletingId?: string;
    context?: common.UIAbilityContext | null;
    foodDataChangedCallback?: () => void;
}
import DatabaseService from "@normalized:N&&&feature_food/Index&1.0.0";
import type { FoodDetail } from "@normalized:N&&&feature_food/Index&1.0.0";
import EventManager from "@normalized:N&&&common_utils/src/main/ets/manager/EventManager&1.0.0";
import type common from "@ohos:app.ability.common";
import type { GoalItem } from "common_utils/src/main/ets/viewmodel/GoalItem";
import hilog from "@ohos:hilog";
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
export function FoodManagePageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new FoodManagePage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "feature/feature_mine/src/main/ets/pages/FoodManagePage.ets", line: 12, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "FoodManagePage" });
    }
}
export class FoodManagePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__foodListData = new ObservedPropertyObjectPU([], this, "foodListData");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__loadError = new ObservedPropertySimplePU(false, this, "loadError");
        this.__deletingId = new ObservedPropertySimplePU('', this, "deletingId");
        this.context = null;
        this.foodDataChangedCallback = () => {
            hilog.info(0x0000, 'FoodManagePage', '收到数据变化通知，刷新数据');
            this.loadFoodDataFromDB(); // 重新加载数据
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FoodManagePage_Params) {
        if (params.foodListData !== undefined) {
            this.foodListData = params.foodListData;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.loadError !== undefined) {
            this.loadError = params.loadError;
        }
        if (params.deletingId !== undefined) {
            this.deletingId = params.deletingId;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.foodDataChangedCallback !== undefined) {
            this.foodDataChangedCallback = params.foodDataChangedCallback;
        }
    }
    updateStateVars(params: FoodManagePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__foodListData.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__loadError.purgeDependencyOnElmtId(rmElmtId);
        this.__deletingId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__foodListData.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__loadError.aboutToBeDeleted();
        this.__deletingId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __foodListData: ObservedPropertyObjectPU<FoodDetail[]>;
    get foodListData() {
        return this.__foodListData.get();
    }
    set foodListData(newValue: FoodDetail[]) {
        this.__foodListData.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __loadError: ObservedPropertySimplePU<boolean>;
    get loadError() {
        return this.__loadError.get();
    }
    set loadError(newValue: boolean) {
        this.__loadError.set(newValue);
    }
    private __deletingId: ObservedPropertySimplePU<string>; // 正在删除的项目id
    get deletingId() {
        return this.__deletingId.get();
    }
    set deletingId(newValue: string) {
        this.__deletingId.set(newValue);
    }
    private context: common.UIAbilityContext | null;
    private foodDataChangedCallback: () => void;
    async aboutToAppear() {
        hilog.info(0x0000, 'FoodManagePage', '页面aboutToAppear开始');
        this.context = getContext(this) as common.UIAbilityContext;
        // 监听数据变化事件
        EventManager.getInstance().on('foodDataChanged', this.foodDataChangedCallback);
        await this.loadFoodDataFromDB();
    }
    aboutToDisappear() {
        // 清理监听
        EventManager.getInstance().off('foodDataChanged', this.foodDataChangedCallback);
    }
    // 先加载食品数据
    async loadFoodDataFromDB() {
        this.isLoading = true;
        this.loadError = false;
        try {
            const allFoods: GoalItem[] = await DatabaseService.queryAllPlans();
            hilog.info(0x0000, 'FoodManagePage', `获取到食品数据: ${allFoods.length} 条`);
            if (allFoods && allFoods.length > 0) {
                await this.transformDBDataToFoodList(allFoods);
            }
            else {
                // 如果数据库为空，显示空列表
                hilog.info(0x0000, 'FoodManagePage', '暂无数据');
                this.foodListData = [];
            }
        }
        catch (err) {
            hilog.error(0x0000, 'FoodManagePage', '从数据库加载食品数据失败: ' + JSON.stringify(err));
            this.loadError = true;
            this.foodListData = [];
        }
        finally {
            this.isLoading = false;
        }
    }
    // 将数据库GoalItem 数据转换为FoodList格式
    async transformDBDataToFoodList(dbFoods: GoalItem[]) {
        this.foodListData = dbFoods.map((item: GoalItem) => {
            hilog.info(0x0000, 'FoodManagePage', `处理食品: ${item.title}, 图片路径: ${item.pic}`);
            return {
                id: item.id.toString(),
                title: item.title,
                desc: `月售${item.sales || 0}+`,
                price: item.price,
                pic: item.pic,
                label: item.label || '',
                buyNum: 0,
                category: item.category || '默认分类'
            } as FoodDetail;
        });
        hilog.info(0x0000, 'FoodManagePage', `转换了 ${this.foodListData.length} 个商品`);
    }
    /**
     * 获取图片数据源
     * 支持base64和resourse两种格式
     * 重复，后期改为通用接口
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
    // 手动刷新
    async manualRefresh() {
        hilog.info(0x0000, 'FoodManagePage', '手动刷新数据');
        await this.loadFoodDataFromDB();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 标题栏
                    Row.create();
                    // 标题栏
                    Row.width('100%');
                    // 标题栏
                    Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                    // 标题栏
                    Row.backgroundColor(Color.White);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("食品管理");
                    Text.fontSize(20);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(Color.Black);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 刷新按钮
                    Button.createWithLabel('刷新');
                    // 刷新按钮
                    Button.fontSize(14);
                    // 刷新按钮
                    Button.backgroundColor(Color.Transparent);
                    // 刷新按钮
                    Button.onClick(() => {
                        this.manualRefresh();
                    });
                }, Button);
                // 刷新按钮
                Button.pop();
                // 标题栏
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载状态
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height(200);
                                Column.justifyContent(FlexAlign.Center);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.width(50);
                                LoadingProgress.height(50);
                            }, LoadingProgress);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('加载中...');
                                Text.fontSize(14);
                                Text.margin({ top: 10 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                        });
                    }
                    // 错误状态
                    else if (this.loadError) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height(200);
                                Column.justifyContent(FlexAlign.Center);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                Image.width(60);
                                Image.height(60);
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('数据加载失败');
                                Text.fontSize(16);
                                Text.margin({ top: 10 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('重新加载');
                                Button.onClick(() => {
                                    this.loadFoodDataFromDB();
                                });
                                Button.margin({ top: 20 });
                            }, Button);
                            Button.pop();
                            Column.pop();
                        });
                    }
                    // 空状态
                    else if (this.foodListData.length === 0) {
                        this.ifElseBranchUpdateFunction(2, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height(300);
                                Column.justifyContent(FlexAlign.Center);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                Image.width(80);
                                Image.height(80);
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('暂无食品数据');
                                Text.fontSize(16);
                                Text.margin({ top: 16 });
                                Text.fontColor(Color.Gray);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('添加食品');
                                Button.onClick(() => {
                                    // 跳转到添加食品页面
                                    RouterModule.push({
                                        stackName: NavStackMap.MAIN_STACK,
                                        url: NavRouterMap.ADD_FOOD_PAGE,
                                        animateSwitch: AnimatedMap.ON,
                                    });
                                });
                                Button.margin({ top: 20 });
                                Button.backgroundColor({ "id": 134217795, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                            }, Button);
                            Button.pop();
                            Column.pop();
                        });
                    }
                    // 数据列表
                    else {
                        this.ifElseBranchUpdateFunction(3, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                List.create({ space: 10 });
                                List.width('100%');
                                List.layoutWeight(1);
                                List.padding(16);
                            }, List);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const foodDetail = _item;
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
                                            ListItem.swipeAction({
                                                end: this.DeleteSwipeButton.bind(this, foodDetail) // 传入 Builder 函数，不是直接调用异步函数
                                            });
                                        };
                                        const deepRenderFunction = (elmtId, isInitialRender) => {
                                            itemCreation(elmtId, isInitialRender);
                                            this.FoodListItem.bind(this)(foodDetail);
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.foodListData, forEachItemGenFunction, (item: FoodDetail) => item.id, false, false);
                            }, ForEach);
                            ForEach.pop();
                            List.pop();
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_mine/src/main/ets/pages/FoodManagePage" });
            NavDestination.title('食品管理');
            NavDestination.padding({ top: 20 });
            NavDestination.backgroundColor(Color.White);
        }, NavDestination);
        NavDestination.pop();
    }
    FoodListItem(foodDetail: FoodDetail, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(Color.White);
            Row.borderRadius(12);
            Row.shadow({ radius: 4, color: '#1A000000', offsetX: 0, offsetY: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 食品图片
            Image.create(this.getImageSource(foodDetail.pic));
            // 食品图片
            Image.height(60);
            // 食品图片
            Image.width(60);
            // 食品图片
            Image.objectFit(ImageFit.Cover);
            // 食品图片
            Image.borderRadius(8);
            // 食品图片
            Image.onError((error) => {
                hilog.error(0x0000, 'FoodManagePage', `图片加载失败: ${foodDetail.pic}, error: ${JSON.stringify(error)}`);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 食品信息
            Column.create();
            // 食品信息
            Column.layoutWeight(1);
            // 食品信息
            Column.margin({ left: 12 });
            // 食品信息
            Column.justifyContent(FlexAlign.SpaceBetween);
            // 食品信息
            Column.onClick(() => {
                RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_FOOD_DETAIL,
                    animateSwitch: AnimatedMap.ON,
                    param: JSON.stringify(foodDetail)
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(foodDetail.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.Black);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(foodDetail.desc);
            Text.fontSize(12);
            Text.fontColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Text.width('100%');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(foodDetail.label);
            Text.fontSize(12);
            Text.fontColor(Color.Gray);
            Text.width('100%');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('￥' + foodDetail.price);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(foodDetail.category);
            Text.fontSize(12);
            Text.fontColor(Color.Gray);
        }, Text);
        Text.pop();
        Row.pop();
        // 食品信息
        Column.pop();
        Row.pop();
    }
    DeleteSwipeButton(foodDetail: FoodDetail, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('删除');
            Button.width(80);
            Button.height('100%');
            Button.onClick(() => {
                // 在点击事件中调用删除函数，而不是直接在end属性中调用
                this.showDeleteConfirmDialog(foodDetail);
            });
        }, Button);
        Button.pop();
    }
    /**
     * 显示删除确认对话框
     */
    showDeleteConfirmDialog(foodDetail: FoodDetail) {
        AlertDialog.show({
            title: '删除确认',
            message: `确定要删除"${foodDetail.title}"吗？此操作不可恢复。`,
            primaryButton: {
                value: '删除',
                action: () => {
                    DatabaseService.deleteFood(parseInt(foodDetail.id));
                },
                backgroundColor: { "id": 134217797, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
                fontColor: Color.White
            },
            secondaryButton: {
                value: '取消',
                action: () => {
                    hilog.info(0x0000, 'FoodManagePage', '用户取消删除');
                }
            }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("FoodManagePage", wrapBuilder(FoodManagePageBuilder));
    }
})();
