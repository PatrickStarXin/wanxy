if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FoodCategory_Params {
    currentIndex?: number;
    scroller?: Scroller;
    isFoodCategoryOnShow?: boolean;
    choosePrice?: number;
    buyFoods?: Map<string, FoodDetail>;
    chooseTakeOutAddr?: string;
    orderType?: OrderType | undefined;
    chooseShop?: string;
    chickShop?: boolean;
    foodCategoryList?: string[];
    foodListData?: FoodList[];
    isGetLocation?: boolean;
    timerId?: number | undefined;
    latitude?: number;
    longitude?: number;
    chooseShopDistance?: number;
    isLoading?: boolean;
    loadError?: boolean;
    singleSelectCapsuleOptions?: SegmentButtonOptions;
    singleSelectCapsuleSelectedIndexes?: number[];
    topRectHeight?: string;
    lastRefreshTime?: number;
    refreshInterval?: number;
    foodDataChangedCallback?: () => void;
    onFoodDataChanged?;
}
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "@normalized:N&&&router_manage/Index&1.0.0";
import type { FoodDetail, FoodList } from '../model/FoodModelData';
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { PermissionRequestResult as PermissionRequestResult } from "@ohos:abilityAccessCtrl";
import type { Permissions as Permissions } from "@ohos:abilityAccessCtrl";
import type { BusinessError as BusinessError } from "@ohos:base";
import geoLocationManager from "@ohos:geoLocationManager";
import { addition, Logger, OrderType, PermissionsUtil, PreferenceUtil, subtraction } from "@normalized:N&&&common_utils/Index&1.0.0";
import { ShopDetailList } from "@normalized:N&&&feature_map/Index&1.0.0";
import type { ShopDetail } from "@normalized:N&&&feature_map/Index&1.0.0";
import map from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map";
import type mapCommon from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon";
import { SegmentButton as SegmentButton } from "@ohos:arkui.advanced.SegmentButton";
import type { SegmentButtonItemTuple as SegmentButtonItemTuple } from "@ohos:arkui.advanced.SegmentButton";
import { SegmentButtonOptions as SegmentButtonOptions } from "@ohos:arkui.advanced.SegmentButton";
import type common from "@ohos:app.ability.common";
import deviceInfo from "@ohos:deviceInfo";
import DatabaseService from "@normalized:N&&&common_utils/src/main/ets/service/DatabaseService&1.0.0";
import type { GoalItem } from 'common_utils/src/main/ets/viewmodel/GoalItem';
import hilog from "@ohos:hilog";
import EventManager from "@normalized:N&&&common_utils/src/main/ets/manager/EventManager&1.0.0";
import type Want from "@ohos:app.ability.Want";
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
let permissions: Array<Permissions> = ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'];
export class FoodCategory extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.scroller = new Scroller();
        this.__isFoodCategoryOnShow = new SynchedPropertySimpleOneWayPU(params.isFoodCategoryOnShow, this, "isFoodCategoryOnShow");
        this.__chickShop = new ObservedPropertySimplePU(false, this, "chickShop");
        this.__foodCategoryList = new ObservedPropertyObjectPU([], this, "foodCategoryList");
        this.__foodListData = new ObservedPropertyObjectPU([], this, "foodListData");
        this.__isGetLocation = new ObservedPropertySimplePU(false, this, "isGetLocation");
        this.__timerId = new ObservedPropertyObjectPU(undefined, this, "timerId");
        this.__latitude = new ObservedPropertySimplePU(0, this, "latitude");
        this.__longitude = new ObservedPropertySimplePU(0, this, "longitude");
        this.__chooseShopDistance = new ObservedPropertySimplePU(0, this, "chooseShopDistance");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__loadError = new ObservedPropertySimplePU(false, this, "loadError");
        this.__singleSelectCapsuleOptions = new ObservedPropertyObjectPU(SegmentButtonOptions.capsule({
            buttons: [{ text: '堂食' }, { text: '外卖' }] as SegmentButtonItemTuple,
            multiply: false,
            backgroundBlurStyle: BlurStyle.BACKGROUND_THICK,
            selectedBackgroundColor: { "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" }
        }), this, "singleSelectCapsuleOptions");
        this.__singleSelectCapsuleSelectedIndexes = new ObservedPropertyObjectPU([0], this, "singleSelectCapsuleSelectedIndexes");
        this.topRectHeight = AppStorage.get<number>('topRectHeight') + 'px';
        this.__lastRefreshTime = new ObservedPropertySimplePU(0, this, "lastRefreshTime");
        this.refreshInterval = 30000;
        this.foodDataChangedCallback = () => {
            hilog.info(0x0000, 'FoodCategory', '收到数据变化通知，刷新数据');
            this.refreshFoodData();
        };
        this.onFoodDataChanged = () => {
            hilog.info(0x0000, 'FoodCategory', '数据发生变化，立即刷新');
            this.refreshFoodData();
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isFoodCategoryOnShow", this.watchFoodCategoryOnShow);
        this.declareWatch("singleSelectCapsuleSelectedIndexes", this.onSegmentButtonChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FoodCategory_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.isFoodCategoryOnShow === undefined) {
            this.__isFoodCategoryOnShow.set(false
            // 购物车内容
            );
        }
        if (params.chickShop !== undefined) {
            this.chickShop = params.chickShop;
        }
        if (params.foodCategoryList !== undefined) {
            this.foodCategoryList = params.foodCategoryList;
        }
        if (params.foodListData !== undefined) {
            this.foodListData = params.foodListData;
        }
        if (params.isGetLocation !== undefined) {
            this.isGetLocation = params.isGetLocation;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
        if (params.chooseShopDistance !== undefined) {
            this.chooseShopDistance = params.chooseShopDistance;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.loadError !== undefined) {
            this.loadError = params.loadError;
        }
        if (params.singleSelectCapsuleOptions !== undefined) {
            this.singleSelectCapsuleOptions = params.singleSelectCapsuleOptions;
        }
        if (params.singleSelectCapsuleSelectedIndexes !== undefined) {
            this.singleSelectCapsuleSelectedIndexes = params.singleSelectCapsuleSelectedIndexes;
        }
        if (params.topRectHeight !== undefined) {
            this.topRectHeight = params.topRectHeight;
        }
        if (params.lastRefreshTime !== undefined) {
            this.lastRefreshTime = params.lastRefreshTime;
        }
        if (params.refreshInterval !== undefined) {
            this.refreshInterval = params.refreshInterval;
        }
        if (params.foodDataChangedCallback !== undefined) {
            this.foodDataChangedCallback = params.foodDataChangedCallback;
        }
        if (params.onFoodDataChanged !== undefined) {
            this.onFoodDataChanged = params.onFoodDataChanged;
        }
    }
    updateStateVars(params: FoodCategory_Params) {
        this.__isFoodCategoryOnShow.reset(params.isFoodCategoryOnShow);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isFoodCategoryOnShow.purgeDependencyOnElmtId(rmElmtId);
        this.__choosePrice.purgeDependencyOnElmtId(rmElmtId);
        this.__buyFoods.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseTakeOutAddr.purgeDependencyOnElmtId(rmElmtId);
        this.__orderType.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseShop.purgeDependencyOnElmtId(rmElmtId);
        this.__chickShop.purgeDependencyOnElmtId(rmElmtId);
        this.__foodCategoryList.purgeDependencyOnElmtId(rmElmtId);
        this.__foodListData.purgeDependencyOnElmtId(rmElmtId);
        this.__isGetLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__timerId.purgeDependencyOnElmtId(rmElmtId);
        this.__latitude.purgeDependencyOnElmtId(rmElmtId);
        this.__longitude.purgeDependencyOnElmtId(rmElmtId);
        this.__chooseShopDistance.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__loadError.purgeDependencyOnElmtId(rmElmtId);
        this.__singleSelectCapsuleOptions.purgeDependencyOnElmtId(rmElmtId);
        this.__singleSelectCapsuleSelectedIndexes.purgeDependencyOnElmtId(rmElmtId);
        this.__lastRefreshTime.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__isFoodCategoryOnShow.aboutToBeDeleted();
        this.__choosePrice.aboutToBeDeleted();
        this.__buyFoods.aboutToBeDeleted();
        this.__chooseTakeOutAddr.aboutToBeDeleted();
        this.__orderType.aboutToBeDeleted();
        this.__chooseShop.aboutToBeDeleted();
        this.__chickShop.aboutToBeDeleted();
        this.__foodCategoryList.aboutToBeDeleted();
        this.__foodListData.aboutToBeDeleted();
        this.__isGetLocation.aboutToBeDeleted();
        this.__timerId.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__chooseShopDistance.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__loadError.aboutToBeDeleted();
        this.__singleSelectCapsuleOptions.aboutToBeDeleted();
        this.__singleSelectCapsuleSelectedIndexes.aboutToBeDeleted();
        this.__lastRefreshTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private scroller: Scroller;
    private __isFoodCategoryOnShow: SynchedPropertySimpleOneWayPU<boolean>;
    get isFoodCategoryOnShow() {
        return this.__isFoodCategoryOnShow.get();
    }
    set isFoodCategoryOnShow(newValue: boolean) {
        this.__isFoodCategoryOnShow.set(newValue);
    }
    // 购物车内容
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
    // 订单类型
    private __chooseTakeOutAddr: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>("chooseTakeOutAddr", "", "chooseTakeOutAddr");
    get chooseTakeOutAddr() {
        return this.__chooseTakeOutAddr.get();
    }
    set chooseTakeOutAddr(newValue: string) {
        this.__chooseTakeOutAddr.set(newValue);
    }
    private __orderType: ObservedPropertyAbstractPU<OrderType | undefined> = this.createLocalStorageLink<OrderType | undefined>("orderType", undefined, "orderType");
    get orderType() {
        return this.__orderType.get();
    }
    set orderType(newValue: OrderType | undefined) {
        this.__orderType.set(newValue);
    }
    private __chooseShop: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>("chooseShop", ""
    // 当前页面信息
    , "chooseShop");
    get chooseShop() {
        return this.__chooseShop.get();
    }
    set chooseShop(newValue: string) {
        this.__chooseShop.set(newValue);
    }
    // 当前页面信息
    private __chickShop: ObservedPropertySimplePU<boolean>;
    get chickShop() {
        return this.__chickShop.get();
    }
    set chickShop(newValue: boolean) {
        this.__chickShop.set(newValue);
    }
    private __foodCategoryList: ObservedPropertyObjectPU<string[]>;
    get foodCategoryList() {
        return this.__foodCategoryList.get();
    }
    set foodCategoryList(newValue: string[]) {
        this.__foodCategoryList.set(newValue);
    }
    private __foodListData: ObservedPropertyObjectPU<FoodList[]>;
    get foodListData() {
        return this.__foodListData.get();
    }
    set foodListData(newValue: FoodList[]) {
        this.__foodListData.set(newValue);
    }
    private __isGetLocation: ObservedPropertySimplePU<boolean>;
    get isGetLocation() {
        return this.__isGetLocation.get();
    }
    set isGetLocation(newValue: boolean) {
        this.__isGetLocation.set(newValue);
    }
    private __timerId: ObservedPropertyObjectPU<number | undefined>;
    get timerId() {
        return this.__timerId.get();
    }
    set timerId(newValue: number | undefined) {
        this.__timerId.set(newValue);
    }
    private __latitude: ObservedPropertySimplePU<number>;
    get latitude() {
        return this.__latitude.get();
    }
    set latitude(newValue: number) {
        this.__latitude.set(newValue);
    }
    private __longitude: ObservedPropertySimplePU<number>;
    get longitude() {
        return this.__longitude.get();
    }
    set longitude(newValue: number) {
        this.__longitude.set(newValue);
    }
    private __chooseShopDistance: ObservedPropertySimplePU<number>;
    get chooseShopDistance() {
        return this.__chooseShopDistance.get();
    }
    set chooseShopDistance(newValue: number) {
        this.__chooseShopDistance.set(newValue);
    }
    // 数据库相关状态
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
    private __singleSelectCapsuleOptions: ObservedPropertyObjectPU<SegmentButtonOptions>;
    get singleSelectCapsuleOptions() {
        return this.__singleSelectCapsuleOptions.get();
    }
    set singleSelectCapsuleOptions(newValue: SegmentButtonOptions) {
        this.__singleSelectCapsuleOptions.set(newValue);
    }
    private __singleSelectCapsuleSelectedIndexes: ObservedPropertyObjectPU<number[]>;
    get singleSelectCapsuleSelectedIndexes() {
        return this.__singleSelectCapsuleSelectedIndexes.get();
    }
    set singleSelectCapsuleSelectedIndexes(newValue: number[]) {
        this.__singleSelectCapsuleSelectedIndexes.set(newValue);
    }
    private topRectHeight: string;
    // 刷新状态
    private __lastRefreshTime: ObservedPropertySimplePU<number>;
    get lastRefreshTime() {
        return this.__lastRefreshTime.get();
    }
    set lastRefreshTime(newValue: number) {
        this.__lastRefreshTime.set(newValue);
    }
    private refreshInterval: number;
    // 添加事件回调引用
    private foodDataChangedCallback: () => void;
    async aboutToAppear() {
        // 获取Context并初始化数据库
        let context = getContext(this) as common.UIAbilityContext;
        try {
            // 初始化数据库连接
            await DatabaseService.createObjectiveRDB(context);
            hilog.info(0x0000, 'FoodCategory.aboutToAppear', '数据库连接成功');
            // 创建表
            await DatabaseService.createFoodInfoTable();
            await DatabaseService.createFoodCategoryTable();
            // 初始化数据
            await DatabaseService.initFoodInfoTable();
            await DatabaseService.initFoodCategoryTable();
            hilog.info(0x0000, 'FoodCategory.aboutToAppear', '数据库初始化完成');
        }
        catch (error) {
            hilog.error(0x0000, 'FoodCategory.aboutToAppear', '数据库初始化失败: ' + JSON.stringify(error));
        }
        if (this.orderType === undefined || this.orderType === OrderType.DINE_IN) {
            this.singleSelectCapsuleSelectedIndexes[0] = 0;
            this.orderType = OrderType.DINE_IN;
        }
        else {
            this.singleSelectCapsuleSelectedIndexes[0] = 1;
        }
        // 加载数据库数据
        await this.loadFoodDataFromDB();
        this.getLocation();
        // 监听数据变化事件
        EventManager.getInstance().on('foodDataChanged', this.foodDataChangedCallback);
        // 距离上次刷新超过30秒刷新
        const now = new Date().getTime();
        if (now - this.lastRefreshTime > this.refreshInterval) {
            await this.refreshFoodData();
        }
        // 只在有权限时获取定位，不自动申请权限
        await this.checkLocationPermissionWithoutRequest();
    }
    aboutToDisappear() {
        // 清理监听 - 使用相同的回调引用
        EventManager.getInstance().off('foodDataChanged', this.foodDataChangedCallback);
    }
    private onFoodDataChanged;
    async refreshFoodData() {
        hilog.info(0x0000, 'FoodCategory', '开始刷新食品数据');
        this.lastRefreshTime = new Date().getTime();
        await this.loadFoodDataFromDB();
    }
    // 添加手动刷新方法
    async manualRefresh() {
        hilog.info(0x0000, 'FoodCategory', '手动刷新数据');
        await this.refreshFoodData();
    }
    /**
     * 从数据库中加载食品数据
     */
    async loadFoodDataFromDB() {
        this.isLoading = true;
        this.loadError = false;
        try {
            // 从数据库中获取分类数据
            const categories = await DatabaseService.queryAllCategories();
            hilog.info(0x0000, 'loadFoodDataFromDB', `获取到分类: ${JSON.stringify(categories)}`);
            // 从数据库中获取所有食品数据
            const allFoods: GoalItem[] = await DatabaseService.queryAllPlans();
            hilog.info(0x0000, 'loadFoodDataFromDB', `获取到食品数据: ${allFoods.length} 条`);
            if (allFoods && allFoods.length > 0) {
                // 将数据库数据转换为前端需要的格式
                await this.transformDBDataToFoodList(allFoods);
            }
            else {
                // 如果数据库为空，显示初始化数据
                hilog.info(0x0000, '食物数据获取', '暂无数据');
                this.foodCategoryList = categories; // 即使没有食品数据，也显示分类
                this.foodListData = [];
            }
        }
        catch (error) {
            hilog.error(0x0000, 'loadFoodDataFromDB', '从数据库加载食品数据失败: ' + JSON.stringify(error));
            this.loadError = true;
            // 报错置空
            this.foodCategoryList = [];
            this.foodListData = [];
        }
        finally {
            this.isLoading = false;
        }
    }
    // 将数据库GoalItem 数据转换为FoodList格式
    async transformDBDataToFoodList(dbFoods: GoalItem[]) {
        const categoryMap = new Map<string, FoodDetail[]>();
        dbFoods.forEach((item: GoalItem) => {
            hilog.info(0x0000, 'FoodCategory_transformDBDataToFoodList', `处理食品: ${item.title}, 图片路径: ${item.pic}, 类型: ${typeof item.pic}`);
            // 将GoalItem 转换为 FoodList
            const foodDetail: FoodDetail = {
                id: item.id.toString(),
                title: item.title,
                desc: `月售${item.sales || 0}+`,
                price: item.price,
                pic: item.pic,
                label: item.label || '',
                buyNum: 0,
                category: item.category || '默认分类'
            };
            // 按分类分组
            const category = foodDetail.category;
            if (!categoryMap.has(category)) {
                categoryMap.set(category, []);
            }
            categoryMap.get(category)!.push(foodDetail);
        });
        // 转换为FoodList[]格式
        this.foodCategoryList = Array.from(categoryMap.keys());
        this.foodListData = Array.from(categoryMap.entries()).map((entry) => ({
            category: entry[0],
            list: entry[1]
        } as FoodList));
        hilog.info(0x0000, 'transformDBDataToFoodList', `从数据库加载了 ${this.foodCategoryList.length} 个分类，${dbFoods.length} 个商品`);
    }
    /**
     * 监测页面显示/隐藏
     */
    watchFoodCategoryOnShow() {
        if (this.isFoodCategoryOnShow) {
            this.getLocation();
        }
    }
    /**
     * 打开定位
     */
    async openLocation() {
        // 直接调用统一的权限检查方法
        await this.checkLocationPermission();
    }
    /**
     * 检查定位权限但不申请
     */
    async checkLocationPermissionWithoutRequest() {
        try {
            let permissionUtil = new PermissionsUtil();
            const locationPermissionStatus = await permissionUtil.checkAccessToken('ohos.permission.LOCATION');
            const approxLocationPermissionStatus = await permissionUtil.checkAccessToken('ohos.permission.APPROXIMATELY_LOCATION');
            if (locationPermissionStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED &&
                approxLocationPermissionStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                // 已有权限，获取定位
                this.getLocation();
                this.isGetLocation = true;
            }
            else {
                // 没有权限，不自动申请，等待用户点击
                this.isGetLocation = false;
                hilog.info(0x0000, 'FoodCategory', '定位权限未授予，等待用户手动申请');
            }
        }
        catch (err) {
            hilog.error(0x0000, 'FoodCategory', '检查定位权限失败: ' + JSON.stringify(err));
            this.isGetLocation = false;
        }
    }
    /**
     * 校验是否有权限
     */
    async checkLocationPermission() {
        try {
            let productModelInfo: string = deviceInfo.productModel;
            if (productModelInfo === 'emulator') {
                PreferenceUtil.showToastMessage('模拟器不支持定位功能，请使用真机测试');
                this.isGetLocation = false;
                return;
            }
            // 使用PermissionsUtil 申请定位权限
            let permissionUtil = new PermissionsUtil();
            // 先检查权限状态
            const locationPermissionStatus = await permissionUtil.checkAccessToken('ohos.permission.LOCATION');
            const approxLocationPermissionStatus = await permissionUtil.checkAccessToken('ohos.permission.APPROXIMATELY_LOCATION');
            hilog.info(0x0000, 'FoodCategory_checkLocationPermission', `权限检查结果: LOCATION=${locationPermissionStatus}, APPROXIMATELY_LOCATION=${approxLocationPermissionStatus}`);
            if (locationPermissionStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED &&
                approxLocationPermissionStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                // 已有权限，检查系统定位服务是否开启
                if (!geoLocationManager.isLocationEnabled()) {
                    hilog.error(0x0000, 'FoodCategory_checkLocationPermission', '权限已授予但系统定位服务未开启');
                    PreferenceUtil.showToastMessage('系统定位服务未开启，请在设置中开启');
                    this.isGetLocation = false;
                    this.showLocationServiceDialog();
                    return;
                }
                // 已有权限且系统定位服务开启，直接获取定位
                hilog.info(0x0000, 'FoodCategory_checkLocationPermission', '权限和定位服务都已就绪，开始获取定位');
                this.getLocation();
                this.isGetLocation = true;
                if (this.timerId) {
                    clearInterval(this.timerId);
                }
            }
            else {
                // 申请权限
                hilog.info(0x0000, 'FoodCategory_checkLocationPermission', '开始申请定位权限');
                let context = getContext(this) as common.UIAbilityContext;
                await permissionUtil.requestPermission(permissions, context, (result: PermissionRequestResult) => {
                    hilog.info(0x0000, 'FoodCategory_checkLocationPermission', `权限申请结果: ${JSON.stringify(result)}`);
                    if (result.authResults && result.authResults.every(grantResult => grantResult === 0)) {
                        hilog.info(0x0000, 'FoodCategory_checkLocationPermission', '定位权限授权成功');
                        // 权限申请成功后，检查系统定位服务
                        if (!geoLocationManager.isLocationEnabled()) {
                            hilog.error(0x0000, 'FoodCategory_checkLocationPermission', '权限已授予但系统定位服务未开启');
                            PreferenceUtil.showToastMessage('系统定位服务未开启，请在设置中开启');
                            this.isGetLocation = false;
                            this.showLocationServiceDialog();
                            return;
                        }
                        this.getLocation();
                        this.isGetLocation = true;
                        if (this.timerId) {
                            clearInterval(this.timerId);
                        }
                    }
                    else {
                        hilog.error(0x0000, 'FoodCategory_checkLocationPermission', '定位权限被拒绝');
                        PreferenceUtil.showToastMessage('需要定位权限才能获取位置信息');
                        this.isGetLocation = false;
                    }
                });
            }
        }
        catch (err) {
            hilog.error(0x0000, 'FoodCategory_checkLocationPermission', '申请定位权限失败: ' + JSON.stringify(err));
            PreferenceUtil.showToastMessage('申请定位权限失败');
            this.isGetLocation = false;
        }
    }
    // 获取当前定位
    // 获取当前定位
    getLocation() {
        let locationChange = (err: BusinessError, location: geoLocationManager.Location) => {
            if (err) {
                this.isGetLocation = false;
                hilog.error(0x0000, 'FoodCategory_getLocation', '获取定位失败: ' + JSON.stringify(err));
                // 根据错误码提供具体提示
                if (err.code === 3301100) {
                    PreferenceUtil.showToastMessage('定位服务不可用，请在系统设置中开启定位服务');
                    this.showLocationServiceDialog();
                }
                else if (err.code === 3301200) {
                    PreferenceUtil.showToastMessage('定位失败，请稍后重试');
                }
                else {
                    PreferenceUtil.showToastMessage('获取位置信息失败，错误码: ' + err.code);
                }
                return;
            }
            if (location) {
                this.isGetLocation = true;
                hilog.info(0x0000, 'FoodCategory_getLocation', '获取定位成功: latitude=' + location.latitude + ', longitude=' + location.longitude);
                this.latitude = location.latitude;
                this.longitude = location.longitude;
                this.getRecentShop();
            }
            else {
                this.isGetLocation = false;
                hilog.error(0x0000, 'FoodCategory_getLocation', '获取定位返回空位置信息');
                PreferenceUtil.showToastMessage('未能获取到有效位置信息');
            }
        };
        try {
            hilog.info(0x0000, 'FoodCategory_getLocation', '开始调用系统定位服务');
            // 检查设备是否支持定位
            if (!geoLocationManager.isLocationEnabled()) {
                hilog.error(0x0000, 'FoodCategory_getLocation', '系统定位服务未开启');
                this.showLocationServiceDialog();
                return;
            }
            geoLocationManager.getCurrentLocation(locationChange);
        }
        catch (err) {
            hilog.error(0x0000, 'FoodCategory_getLocation', '调用定位服务异常: ' + JSON.stringify(err));
            this.isGetLocation = false;
            if (err.code === 3301100) {
                this.showLocationServiceDialog();
            }
            else {
                PreferenceUtil.showToastMessage('定位服务异常，请检查系统设置');
            }
        }
    }
    /**
     * 显示系统定位服务开启引导对话框
     */
    showLocationServiceDialog() {
        // 这里可以显示一个自定义对话框引导用户开启系统定位服务
        AlertDialog.show({
            title: '开启定位服务',
            message: '系统定位服务未开启，请在系统设置中开启定位服务：\n\n1. 进入"设置"应用\n2. 找到"定位服务"或"位置信息"\n3. 开启定位服务开关\n4. 返回应用重新获取位置',
            primaryButton: {
                value: '去设置',
                action: () => {
                    // 尝试跳转到系统设置页面
                    this.openSystemLocationSettings();
                }
            },
            secondaryButton: {
                value: '取消',
                action: () => {
                    hilog.info(0x0000, 'FoodCategory', '用户取消开启定位服务');
                }
            }
        });
    }
    /**
     * 尝试打开系统定位设置
     */
    async openSystemLocationSettings() {
        try {
            let context = getContext(this) as common.UIAbilityContext;
            // 使用 Want 类型声明
            let want: Want = {
                bundleName: 'com.android.settings',
                abilityName: 'com.android.settings.Settings',
                parameters: {
                    'android.settings.LOCATION_SOURCE_SETTINGS': ''
                }
            };
            await context.startAbility(want);
            hilog.info(0x0000, 'FoodCategory', '已尝试打开系统设置');
        }
        catch (error) {
            hilog.error(0x0000, 'FoodCategory', '打开系统设置失败: ' + JSON.stringify(error));
            // 如果 Android 方式失败，尝试 HarmonyOS 的方式
            await this.openHarmonyOSLocationSettings();
        }
    }
    /**
     * 尝试打开 HarmonyOS 系统定位设置
     */
    async openHarmonyOSLocationSettings() {
        try {
            let context = getContext(this) as common.UIAbilityContext;
            // HarmonyOS 的方式
            let want: Want = {
                action: 'action.settings.location',
                // 或者使用以下方式
                // bundleName: 'com.huawei.systemmanager',
                // abilityName: 'com.huawei.systemmanager.subactivity.location.LocationActivity'
            };
            await context.startAbility(want);
            hilog.info(0x0000, 'FoodCategory', '已尝试打开 HarmonyOS 系统设置');
        }
        catch (error) {
            hilog.error(0x0000, 'FoodCategory', '打开 HarmonyOS 系统设置失败: ' + JSON.stringify(error));
            PreferenceUtil.showToastMessage('无法自动打开设置，请手动在系统设置中开启定位服务');
        }
    }
    // 获取最近的商店
    getRecentShop() {
        let shopList: ShopDetail[] = ShopDetailList;
        let fromLatLng: mapCommon.LatLng = {
            latitude: this.latitude,
            longitude: this.longitude
        };
        // 如果是第一次进来则找最近的店铺
        if (this.chooseShop == "") {
            let minDistance = 9999999999;
            let minDistanceShop = this.chooseShop;
            for (let i = 0; i < shopList.length; i++) {
                let toLatLng: mapCommon.LatLng = {
                    latitude: shopList[i].latitude,
                    longitude: shopList[i].longitude
                };
                let distance = map.calculateDistance(fromLatLng, toLatLng);
                Logger.info("店铺【" + shopList[i].name + "】，距离当前【" + distance + "】米");
                if (distance < minDistance) {
                    minDistance = distance;
                    minDistanceShop = shopList[i].name;
                }
            }
            this.chooseShop = minDistanceShop;
            this.chooseShopDistance = minDistance;
            Logger.info("最近的店铺是【" + minDistanceShop + "】，距离当前【" + minDistance + "】米");
        }
        else {
            // 如果不是则寻找选中的店铺
            for (let i = 0; i < shopList.length; i++) {
                if (shopList[i].name == this.chooseShop) {
                    let toLatLng: mapCommon.LatLng = {
                        latitude: shopList[i].latitude,
                        longitude: shopList[i].longitude
                    };
                    this.chooseShopDistance = map.calculateDistance(fromLatLng, toLatLng);
                }
            }
        }
        // 数据加载 todo 校验当前店铺购物车中商品是否存在
        // this.foodCategoryList = getCategoryListByShop(this.chooseShop)
        // this.foodListData = getFoodListByShop(this.chooseShop)
    }
    onSegmentButtonChange() {
        if (this.singleSelectCapsuleSelectedIndexes[0] === 0) {
            this.orderType = OrderType.DINE_IN;
        }
        else {
            this.orderType = OrderType.TAKEOUT;
            if (this.chooseTakeOutAddr == "") {
                RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_TAKE_OUT,
                    animateSwitch: AnimatedMap.ON,
                });
            }
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
                    Column.create();
                    Column.width('100%');
                    Column.height('calc(100% - 105vp)');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载状态显示
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
                    // 错误状态显示
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
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 你原来的所有内容放在这里
                                Row.create();
                                // 你原来的所有内容放在这里
                                Row.justifyContent(FlexAlign.Start);
                                // 你原来的所有内容放在这里
                                Row.width('100%');
                                // 你原来的所有内容放在这里
                                Row.height(50);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create("美食列表");
                                Text.fontWeight(600);
                                Text.fontSize(18);
                                Text.alignSelf(ItemAlign.Start);
                                Text.margin({ left: 15, top: 20 });
                            }, Text);
                            Text.pop();
                            // 你原来的所有内容放在这里
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.justifyContent(FlexAlign.SpaceBetween);
                                Row.width('100%');
                                Row.height(40);
                                Row.margin({ top: 15 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (this.orderType === OrderType.TAKEOUT) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.onClick(() => {
                                                RouterModule.push({
                                                    stackName: NavStackMap.MAIN_STACK,
                                                    url: NavRouterMap.PAGE_TAKE_OUT,
                                                    animateSwitch: AnimatedMap.ON,
                                                });
                                            });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(this.chooseTakeOutAddr);
                                            Text.margin({ left: 15 });
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                            Image.height(25);
                                            Image.width(25);
                                            Image.margin({ left: 5 });
                                        }, Image);
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create({ "id": 134217776, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                            Image.height(15);
                                            Image.width(15);
                                            Image.margin({ right: 5 });
                                            Image.onClick(() => {
                                                RouterModule.push({
                                                    stackName: NavStackMap.MAIN_STACK,
                                                    url: NavRouterMap.PAGE_SHOP_LIST,
                                                    animateSwitch: AnimatedMap.ON,
                                                });
                                            });
                                        }, Image);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(this.chooseShop + " 配送");
                                            Text.fontSize(12);
                                            Text.fontColor(Color.Gray);
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                        Column.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            If.create();
                                            if (!this.isGetLocation) {
                                                this.ifElseBranchUpdateFunction(0, () => {
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Row.create();
                                                        Row.justifyContent(FlexAlign.Center);
                                                        Row.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                                        Row.height('100%');
                                                        Row.width(100);
                                                    }, Row);
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Text.create("开启定位");
                                                        Text.onClick(async () => {
                                                            let productModelInfo: string = deviceInfo.productModel;
                                                            if (productModelInfo === 'emulator') {
                                                                PreferenceUtil.showToastMessage('请使用真机运行');
                                                            }
                                                            else {
                                                                this.openLocation();
                                                            }
                                                        });
                                                    }, Text);
                                                    Text.pop();
                                                    Row.pop();
                                                });
                                            }
                                            else {
                                                this.ifElseBranchUpdateFunction(1, () => {
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Row.create();
                                                        Row.onClick(() => {
                                                            RouterModule.push({
                                                                stackName: NavStackMap.MAIN_STACK,
                                                                url: NavRouterMap.PAGE_SHOP_LIST,
                                                                animateSwitch: AnimatedMap.ON,
                                                            });
                                                        });
                                                    }, Row);
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Text.create(this.chooseShop);
                                                        Text.margin({ left: 15 });
                                                    }, Text);
                                                    Text.pop();
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                                        Image.height(25);
                                                        Image.width(25);
                                                        Image.margin({ left: 5 });
                                                    }, Image);
                                                    Row.pop();
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Text.create("距离您" + this.chooseShopDistance.toFixed(0) + "米");
                                                        Text.fontSize(12);
                                                        Text.fontColor(Color.Gray);
                                                    }, Text);
                                                    Text.pop();
                                                });
                                            }
                                        }, If);
                                        If.pop();
                                        Column.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.width(100);
                                __Common__.margin({ right: 15 });
                                __Common__.onClick(() => {
                                    Logger.error("$singleSelectCapsuleSelectedIndexes = " + this.singleSelectCapsuleSelectedIndexes);
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SegmentButton(this, {
                                            options: this.singleSelectCapsuleOptions,
                                            selectedIndexes: this.__singleSelectCapsuleSelectedIndexes
                                        }, undefined, elmtId, () => { }, { page: "feature/feature_food/src/main/ets/components/FoodCategory.ets", line: 697, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                options: this.singleSelectCapsuleOptions,
                                                selectedIndexes: this.singleSelectCapsuleSelectedIndexes
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            options: this.singleSelectCapsuleOptions
                                        });
                                    }
                                }, { name: "SegmentButton" });
                            }
                            __Common__.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create({ alignContent: Alignment.BottomStart });
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.layoutWeight(1);
                            }, Row);
                            // 左侧导航栏 - 现在使用数据库中的分类
                            this.barBuilder.bind(this)();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 右侧详情 - 现在使用数据库中的食品数据
                                List.create({ scroller: this.scroller });
                                // 右侧详情 - 现在使用数据库中的食品数据
                                List.height('100%');
                                // 右侧详情 - 现在使用数据库中的食品数据
                                List.width('calc(100% - 100vp)');
                                // 右侧详情 - 现在使用数据库中的食品数据
                                List.padding(16);
                                // 右侧详情 - 现在使用数据库中的食品数据
                                List.scrollBar(BarState.Off);
                                // 右侧详情 - 现在使用数据库中的食品数据
                                List.onScrollIndex((start, end) => {
                                    this.currentIndex = start;
                                });
                            }, List);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const item = _item;
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
                                            }, Column);
                                            this.titleBuilder.bind(this)(item);
                                            this.foodListBuilder.bind(this)(item);
                                            Column.pop();
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.foodCategoryList, forEachItemGenFunction, (item: string) => JSON.stringify(item), false, false);
                            }, ForEach);
                            ForEach.pop();
                            // 右侧详情 - 现在使用数据库中的食品数据
                            List.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (this.chickShop) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                            Column.width('100%');
                                            Column.backgroundColor(Color.White);
                                            Column.borderRadius(8);
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                            Column.borderRadius({ topLeft: 16, topRight: 16 });
                                            Column.borderWidth({ top: 0.5 });
                                            Column.borderColor(Color.Gray);
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.justifyContent(FlexAlign.End);
                                            Row.width('100%');
                                            Row.height(40);
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create({ "id": 134217771, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                            Image.width(14);
                                            Image.height(14);
                                            Image.onClick(() => {
                                                this.buyFoods.clear();
                                                this.choosePrice = 0;
                                                this.chickShop = false;
                                            });
                                        }, Image);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create("清空");
                                            Text.fontSize(14);
                                            Text.margin({ left: 3, right: 8 });
                                            Text.onClick(() => {
                                                this.buyFoods.clear();
                                                this.choosePrice = 0;
                                                this.chickShop = false;
                                            });
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Divider.create();
                                        }, Divider);
                                        this.shopDetailBuilder.bind(this)();
                                        Column.pop();
                                        this.shopBuilder.bind(this)();
                                        Column.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.shopBuilder.bind(this)();
                                    });
                                }
                            }, If);
                            If.pop();
                            Stack.pop();
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.justifyContent(FlexAlign.Start);
                    Row.width('100%');
                    Row.height(50);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("美食列表");
                    Text.fontWeight(600);
                    Text.fontSize(18);
                    Text.alignSelf(ItemAlign.Start);
                    Text.margin({ left: 15, top: 20 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.width('100%');
                    Row.height(40);
                    Row.margin({ top: 15 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.orderType === OrderType.TAKEOUT) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.onClick(() => {
                                    RouterModule.push({
                                        stackName: NavStackMap.MAIN_STACK,
                                        url: NavRouterMap.PAGE_TAKE_OUT,
                                        animateSwitch: AnimatedMap.ON,
                                    });
                                });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.chooseTakeOutAddr);
                                Text.margin({ left: 15 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                Image.height(25);
                                Image.width(25);
                                Image.margin({ left: 5 });
                            }, Image);
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 134217776, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                Image.height(15);
                                Image.width(15);
                                Image.margin({ right: 5 });
                                Image.onClick(() => {
                                    RouterModule.push({
                                        stackName: NavStackMap.MAIN_STACK,
                                        url: NavRouterMap.PAGE_SHOP_LIST,
                                        animateSwitch: AnimatedMap.ON,
                                    });
                                });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.chooseShop + " 配送");
                                Text.fontSize(12);
                                Text.fontColor(Color.Gray);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (!this.isGetLocation) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.justifyContent(FlexAlign.Center);
                                            Row.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                            Row.height('100%');
                                            Row.width(100);
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create("开启定位");
                                            Text.onClick(async () => {
                                                let productModelInfo: string = deviceInfo.productModel;
                                                if (productModelInfo === 'emulator') {
                                                    PreferenceUtil.showToastMessage('请使用真机运行');
                                                }
                                                else {
                                                    this.openLocation();
                                                }
                                            });
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.onClick(() => {
                                                RouterModule.push({
                                                    stackName: NavStackMap.MAIN_STACK,
                                                    url: NavRouterMap.PAGE_SHOP_LIST,
                                                    animateSwitch: AnimatedMap.ON,
                                                });
                                            });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(this.chooseShop);
                                            Text.margin({ left: 15 });
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create({ "id": 134217766, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                            Image.height(25);
                                            Image.width(25);
                                            Image.margin({ left: 5 });
                                        }, Image);
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create("距离您" + this.chooseShopDistance.toFixed(0) + "米");
                                            Text.fontSize(12);
                                            Text.fontColor(Color.Gray);
                                        }, Text);
                                        Text.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                            Column.pop();
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.width(100);
                    __Common__.margin({ right: 15 });
                    __Common__.onClick(() => {
                        Logger.error("$singleSelectCapsuleSelectedIndexes = " + this.singleSelectCapsuleSelectedIndexes);
                    });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SegmentButton(this, {
                                options: this.singleSelectCapsuleOptions,
                                selectedIndexes: this.__singleSelectCapsuleSelectedIndexes
                            }, undefined, elmtId, () => { }, { page: "feature/feature_food/src/main/ets/components/FoodCategory.ets", line: 825, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    options: this.singleSelectCapsuleOptions,
                                    selectedIndexes: this.singleSelectCapsuleSelectedIndexes
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                options: this.singleSelectCapsuleOptions
                            });
                        }
                    }, { name: "SegmentButton" });
                }
                __Common__.pop();
                Row.pop();
                Column.pop();
            }, { moduleName: "phone", pagePath: "feature/feature_food/src/main/ets/components/FoodCategory" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor(Color.White);
            NavDestination.margin({ top: this.topRectHeight });
        }, NavDestination);
        NavDestination.pop();
    }
    titleBuilder(item: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item);
            Text.fontSize(18);
            Text.fontColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Row.pop();
    }
    barBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width(100);
            Column.backgroundColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.backgroundColor(this.currentIndex === index ? Color.White : null);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 4 });
                    Row.onClick(() => {
                        this.currentIndex = index;
                        this.scroller.scrollToIndex(this.currentIndex);
                    });
                    Row.padding({
                        top: 20,
                        bottom: 20,
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.currentIndex === index ? { "id": 134217791, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" } : { "id": 134217792, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                    Image.width(10);
                    Image.height(10);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontColor(this.currentIndex === index ? { "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" } : Color.Black);
                    Text.fontSize(12);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.height(1);
                }, Divider);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.foodCategoryList, forEachItemGenFunction, (item: string) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    foodListBuilder(category: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.height(100);
                            Row.onClick(() => {
                                RouterModule.push({
                                    stackName: NavStackMap.MAIN_STACK,
                                    url: NavRouterMap.PAGE_FOOD_DETAIL,
                                    animateSwitch: AnimatedMap.ON,
                                    param: JSON.stringify(foodDetail)
                                });
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(this.getImageSource(foodDetail.pic));
                            Image.height(60);
                            Image.width(60);
                            Image.objectFit(ImageFit.Cover);
                            Image.onError((error) => {
                                hilog.error(0x0000, 'FoodCategory', `图片加载失败: ${foodDetail.pic},error:` + JSON.stringify(error));
                            });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('calc(100% - 70vp)');
                            Column.justifyContent(FlexAlign.Start);
                            Column.padding({ top: 5, bottom: 5 });
                            Column.margin({ left: 10 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.title);
                            Text.fontWeight(600);
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.desc);
                            Text.fontSize(12);
                            Text.fontColor({ "id": 134217759, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.label);
                            Text.fontSize(12);
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.height(30);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(foodDetail.price + '');
                            Text.fontWeight(600);
                            Text.fontSize(16);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                        }, Row);
                        this.buyNumBuilder.bind(this)(foodDetail);
                        Row.pop();
                        Row.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, getFoodListDataMap(this.foodListData).get(category), forEachItemGenFunction, (item: FoodDetail) => JSON.stringify(item.id), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    shopDetailBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buyFoods.size > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
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
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.height(80);
                                        Row.borderWidth({ top: 2 });
                                        Row.borderColor({ "id": 134217758, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                        Row.onClick(() => {
                                            RouterModule.push({
                                                stackName: NavStackMap.MAIN_STACK,
                                                url: NavRouterMap.PAGE_FOOD_DETAIL,
                                                animateSwitch: AnimatedMap.ON,
                                                param: JSON.stringify(foodDetail)
                                            });
                                        });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create({ "id": -1, "type": -1, params: [foodDetail.pic], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                                        Image.height(40);
                                        Image.width(40);
                                        Image.margin({ left: 15 });
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.justifyContent(FlexAlign.Start);
                                        Column.padding({ top: 5, bottom: 5 });
                                        Column.margin({ left: 10 });
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(foodDetail.title);
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(foodDetail.label);
                                        Text.fontSize(12);
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.height(30);
                                        Row.justifyContent(FlexAlign.SpaceBetween);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('￥' + foodDetail.price * foodDetail.buyNum + '');
                                        Text.fontSize(16);
                                        Text.fontWeight(600);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.justifyContent(FlexAlign.SpaceBetween);
                                        Row.margin({ right: 65 });
                                    }, Row);
                                    this.buyNumBuilder.bind(this)(foodDetail);
                                    Row.pop();
                                    Row.pop();
                                    Column.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getBuyFoods(this.buyFoods), forEachItemGenFunction, (item: FoodDetail) => JSON.stringify(item.id), false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    // 加入或删除购物车
    buyNumBuilder(foodDetail: FoodDetail, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buyFoods.get(foodDetail.id)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 134217777, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
                        Image.width(25);
                        Image.height(25);
                        Image.objectFit(ImageFit.Fill);
                        Image.onClick(() => {
                            let item = this.buyFoods.get(foodDetail.id);
                            if (item) {
                                if (item.buyNum > 1) {
                                    item.buyNum--;
                                    this.buyFoods.set(foodDetail.id, item);
                                    // this.choosePrice -= foodDetail.price;
                                    this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
                                    if (this.choosePrice === 0) {
                                        this.chickShop = false;
                                    }
                                }
                                else if (item.buyNum == 1) {
                                    item.buyNum--;
                                    this.buyFoods.delete(foodDetail.id);
                                    // this.choosePrice -= foodDetail.price;
                                    this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
                                    if (this.choosePrice === 0) {
                                        this.chickShop = false;
                                    }
                                }
                                else {
                                    // 提示最低不能低于0
                                }
                            }
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buyFoods.get(foodDetail.id)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.buyFoods.get(foodDetail.id)?.buyNum + "");
                        Text.fontSize(16);
                        Text.margin({ left: 10, right: 10 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217764, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Image.width(25);
            Image.height(25);
            Image.objectFit(ImageFit.Fill);
            Image.onClick(() => {
                // this.choosePrice += foodDetail.price;
                this.choosePrice = addition(this.choosePrice, foodDetail.price);
                let item = this.buyFoods.get(foodDetail.id);
                if (item) {
                    item.buyNum++;
                    this.buyFoods.set(foodDetail.id, item);
                }
                else {
                    foodDetail.buyNum = 1;
                    this.buyFoods.set(foodDetail.id, foodDetail);
                }
            });
        }, Image);
    }
    // 悬浮购物车
    shopBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(50);
            Row.width('100%');
            Row.backgroundColor(Color.White);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.borderWidth({ top: 1 });
            Row.borderColor({ "id": 134217760, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Row.visibility(this.choosePrice === 0 ? Visibility.Hidden : Visibility.Visible);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217780, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Image.height(40);
            Image.width(40);
            Image.margin({ left: 15 });
            Image.onClick(() => {
                this.chickShop = !this.chickShop;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.fontSize(16);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create("￥");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(this.choosePrice + "");
        }, Span);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.backgroundColor({ "id": 134217761, "type": 10001, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" });
            Row.height('80%');
            Row.width(120);
            Row.borderRadius(24);
            Row.margin({ right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("选好了");
            Text.fontColor(Color.White);
            Text.onClick(() => {
                RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_ORDER_PREVIEW,
                    animateSwitch: AnimatedMap.ON
                });
            });
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function getBuyFoods(map: Map<string, FoodDetail>) {
    let foods: FoodDetail[] = [];
    map.forEach((v: FoodDetail, k: string) => {
        foods.push(v);
    });
    return foods;
}
function getFoodListDataMap(data: FoodList[]): Map<string, FoodDetail[]> {
    const map = new Map<string, FoodDetail[]>();
    data.forEach(item => {
        map.set(item.category, item.list);
    });
    return map;
}
