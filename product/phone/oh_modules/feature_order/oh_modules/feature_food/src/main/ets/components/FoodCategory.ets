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

import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from 'router_manage';
import { FoodDetail, FoodList, getCategoryListByShop/*, getFoodListByShop */} from '../model/FoodModelData';
import { abilityAccessCtrl, PermissionRequestResult, Permissions } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { geoLocationManager } from '@kit.LocationKit';
import { addition, Logger, OrderType, PermissionsUtil, PreferenceUtil, subtraction } from 'common_utils';
import { ShopDetail, ShopDetailList } from 'feature_map';
import { map, mapCommon } from '@kit.MapKit';
import { SegmentButton, SegmentButtonItemTuple, SegmentButtonOptions } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { deviceInfo } from '@kit.BasicServicesKit';
import  DatabaseService  from 'common_utils/src/main/ets/service/DatabaseService';
import { GoalItem } from 'common_utils/src/main/ets/viewmodel/GoalItem';
import { hilog } from '@kit.PerformanceAnalysisKit';
import  EventManager  from 'common_utils/src/main/ets/manager/EventManager';
import { Want } from '@kit.AbilityKit';
import { fileIo, fileUri } from '@kit.CoreFileKit';

let permissions: Array<Permissions> = ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'];


@Component
export struct FoodCategory {
  @State currentIndex: number = 0;
  private scroller: Scroller = new Scroller();
  @Prop @Watch('watchFoodCategoryOnShow')isFoodCategoryOnShow: boolean = false
  // 购物车内容
  @LocalStorageLink("choosePrice") choosePrice: number = 0;
  @LocalStorageLink("buyFoods") buyFoods: Map<string, FoodDetail> = new Map<string, FoodDetail>();
  // 订单类型
  @LocalStorageLink("chooseTakeOutAddr") chooseTakeOutAddr: string = "";
  @LocalStorageLink("orderType") orderType: OrderType | undefined = undefined;
  @LocalStorageLink("chooseShop") chooseShop: string = ""
  // 当前页面信息
  @State chickShop: boolean = false;
  @State foodCategoryList: string[] = [];
  @State foodListData: FoodList[] = [];
  @State isGetLocation: boolean = false;
  @State timerId: number | undefined = undefined;
  @State latitude: number = 0;
  @State longitude: number = 0;
  @State chooseShopDistance: number = 0;

  // 数据库相关状态
  @State isLoading: boolean = false;
  @State loadError: boolean = false;

  @State singleSelectCapsuleOptions: SegmentButtonOptions = SegmentButtonOptions.capsule({
    buttons: [{ text: '堂食' }, { text: '外卖' }] as SegmentButtonItemTuple,
    multiply: false,
    backgroundBlurStyle: BlurStyle.BACKGROUND_THICK,
    selectedBackgroundColor: $r("app.color.system_green")
  })
  @State @Watch('onSegmentButtonChange') singleSelectCapsuleSelectedIndexes: number[] = [0]
  topRectHeight: string = AppStorage.get<number>('topRectHeight') + 'px';

  // 刷新状态
  @State lastRefreshTime: number = 0;
  private refreshInterval: number = 30000;
  // 添加事件回调引用
  private foodDataChangedCallback: () => void = () => {
    hilog.info(0x0000, 'FoodCategory', '收到数据变化通知，刷新数据');
    this.refreshFoodData();
  };

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
    } catch (error) {
      hilog.error(0x0000, 'FoodCategory.aboutToAppear', '数据库初始化失败: ' + JSON.stringify(error));
    }

    if (this.orderType === undefined || this.orderType === OrderType.DINE_IN) {
      this.singleSelectCapsuleSelectedIndexes[0] = 0;
      this.orderType = OrderType.DINE_IN
    } else {
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

  onFoodDataChanged = () => {
    hilog.info(0x0000, 'FoodCategory', '数据发生变化，立即刷新');
    this.refreshFoodData();
  }

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
      } else {
        // 如果数据库为空，显示初始化数据
        hilog.info(0x0000, '食物数据获取', '暂无数据');
        this.foodCategoryList = categories; // 即使没有食品数据，也显示分类
        this.foodListData = [];
      }
    } catch (error) {
      hilog.error(0x0000, 'loadFoodDataFromDB', '从数据库加载食品数据失败: ' + JSON.stringify(error));
      this.loadError = true;
      // 报错置空
      this.foodCategoryList = [];
      this.foodListData = [];
    } finally {
      this.isLoading = false;
    }
  }

   // 将数据库GoalItem 数据转换为FoodList格式
  async transformDBDataToFoodList(dbFoods: GoalItem[]) {
    const categoryMap = new Map<string,FoodDetail[]>();

    dbFoods.forEach((item: GoalItem) => {
      hilog.info(0x0000, 'FoodCategory_transformDBDataToFoodList', `处理食品: ${item.title}, 图片路径: ${item.pic}, 类型: ${typeof item.pic}`);
      // 将GoalItem 转换为 FoodList
      const foodDetail: FoodDetail = {
        id: item.id.toString(),
        title: item.title,
        desc: `月售${item.sales || 0}+`,
        price: item.price,
        pic: item.pic, // 这里已经是 base64 字符串或资源路径
        label: item.label || '',
        buyNum: 0,
        category: item.category || '默认分类'
      };

      // 按分类分组
      const category  = foodDetail.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category,[]);
      }
      categoryMap.get(category)!.push(foodDetail);
    });

    // 转换为FoodList[]格式
    this.foodCategoryList = Array.from(categoryMap.keys());
    this.foodListData = Array.from(categoryMap.entries()).map((entry) => ({
      category: entry[0],
      list: entry[1]
    } as FoodList ));

    hilog.info(0x0000,'transformDBDataToFoodList',`从数据库加载了 ${this.foodCategoryList.length} 个分类，${dbFoods.length} 个商品`);
  }

  /**
   * 监测页面显示/隐藏
   */
  watchFoodCategoryOnShow(){
    if(this.isFoodCategoryOnShow) {
      this.getLocation()
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
      } else {
        // 没有权限，不自动申请，等待用户点击
        this.isGetLocation = false;
        hilog.info(0x0000, 'FoodCategory', '定位权限未授予，等待用户手动申请');
      }
    } catch (err) {
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
      } else {
        // 申请权限
        hilog.info(0x0000, 'FoodCategory_checkLocationPermission', '开始申请定位权限');
        let context = getContext(this) as common.UIAbilityContext;
        await permissionUtil.requestPermission(permissions, context,(result: PermissionRequestResult) => {
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
          } else {
            hilog.error(0x0000, 'FoodCategory_checkLocationPermission', '定位权限被拒绝');
            PreferenceUtil.showToastMessage('需要定位权限才能获取位置信息');
            this.isGetLocation = false;
          }
        });
      }
    } catch (err) {
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
        } else if (err.code === 3301200) {
          PreferenceUtil.showToastMessage('定位失败，请稍后重试');
        } else {
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
      } else {
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
    } catch (err) {
      hilog.error(0x0000, 'FoodCategory_getLocation', '调用定位服务异常: ' + JSON.stringify(err));
      this.isGetLocation = false;

      if (err.code === 3301100) {
        this.showLocationServiceDialog();
      } else {
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
    } catch (error) {
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
    } catch (error) {
      hilog.error(0x0000, 'FoodCategory', '打开 HarmonyOS 系统设置失败: ' + JSON.stringify(error));
      PreferenceUtil.showToastMessage('无法自动打开设置，请手动在系统设置中开启定位服务');
    }
  }

  // 获取最近的商店
  getRecentShop() {
    let shopList: ShopDetail[] = ShopDetailList
    let fromLatLng: mapCommon.LatLng = {
      latitude: this.latitude,
      longitude: this.longitude
    };
    // 如果是第一次进来则找最近的店铺
    if (this.chooseShop == "") {
      let minDistance = 9999999999
      let minDistanceShop = this.chooseShop
      for (let i = 0; i < shopList.length; i++) {
        let toLatLng: mapCommon.LatLng = {
          latitude: shopList[i].latitude,
          longitude: shopList[i].longitude
        };
        let distance = map.calculateDistance(fromLatLng, toLatLng);
        Logger.info("店铺【" + shopList[i].name + "】，距离当前【" + distance + "】米");
        if (distance < minDistance) {
          minDistance = distance
          minDistanceShop = shopList[i].name
        }
      }
      this.chooseShop = minDistanceShop
      this.chooseShopDistance = minDistance
      Logger.info("最近的店铺是【" + minDistanceShop + "】，距离当前【" + minDistance + "】米")
    } else {
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
      this.orderType = OrderType.DINE_IN
    } else {
      this.orderType = OrderType.TAKEOUT
      if (this.chooseTakeOutAddr == "") {
        RouterModule.push({
          stackName: NavStackMap.MAIN_STACK,
          url: NavRouterMap.PAGE_TAKE_OUT,
          animateSwitch: AnimatedMap.ON,
        })
      }

    }
  }

  /**
   * 获取图片数据源
   * 支持base64和resourse两种格式
   * 重复，后续换成通用接口
   */
  getImageSource(pic: string): Resource | string | PixelMap{
    if (!pic || pic.trim() === '') {
      hilog.info(0x0000, 'FoodCategory_getImageSource', '图片路径为空，使用默认图片');
      return $r("app.media.food_main");
    }
    // 如果是完整的文件路径
    if (pic.startsWith('/') || pic.startsWith('file://')){
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
      } catch (err) {
        hilog.error(0x0000, 'FoodCategory_getImageSource', `文件访问失败: ${pic}, error: ${JSON.stringify(err)}`);
      }
      return $r("app.media.food_main");
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
        const resource = $r(pic);
        if (resource) {
          return resource;
        }
      } catch (error) {
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
       } catch (err) {
        hilog.error(0x0000, 'FoodCategory', '构建图片路径失败: ' + JSON.stringify(err));
      }
    }

    // 返回一个展位图
    hilog.warn(0x0000, 'FoodCategory', `无法识别的图片路径格式: ${pic}`);
    return $r("app.media.food_main");
  }

  build() {
    NavDestination() {
      Column() {

        // 加载状态显示
        if (this.isLoading) {
          Column() {
            LoadingProgress()
              .width(50)
              .height(50)
            Text('加载中...')
              .fontSize(14)
              .margin({ top: 10 })
          }
          .width('100%')
          .height(200)
          .justifyContent(FlexAlign.Center)
        }
        // 错误状态显示
        else if (this.loadError) {
          Column() {
            Image($r("app.media.food_main"))    // 替换错误图片
              .width(60)
              .height(60)
            Text('数据加载失败')
              .fontSize(16)
              .margin({ top: 10 })
            Button('重新加载')
              .onClick(() => {
                this.loadFoodDataFromDB();
              })
              .margin({ top: 20 })
          }
          .width('100%')
          .height(200)
          .justifyContent(FlexAlign.Center)
        }
        else {
          // 你原来的所有内容放在这里
          Row() {
            Text("美食列表").fontWeight(600).fontSize(18).alignSelf(ItemAlign.Start).margin({ left: 15, top: 20 })
          }.justifyContent(FlexAlign.Start).width('100%').height(50)

          Row() {
            if (this.orderType === OrderType.TAKEOUT) {
              Column() {
                Row() {
                  Text(this.chooseTakeOutAddr).margin({ left: 15 })
                  Image($r("app.media.ic_public_arrow_right")).height(25).width(25).margin({ left: 5 })
                }.onClick(() => {
                  RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_TAKE_OUT,
                    animateSwitch: AnimatedMap.ON,
                  })
                })
                Row() {
                  Image($r("app.media.ic_public_postback")).height(15).width(15).margin({ right: 5 })
                    .onClick(() => {
                      RouterModule.push({
                        stackName: NavStackMap.MAIN_STACK,
                        url: NavRouterMap.PAGE_SHOP_LIST,
                        animateSwitch: AnimatedMap.ON,
                      })
                    })
                  Text(this.chooseShop + " 配送").fontSize(12).fontColor(Color.Gray)
                }

              }
            } else {
              Column() {
                if (!this.isGetLocation) {
                  Row() {
                    Text("开启定位").onClick(async () => {
                      let productModelInfo: string = deviceInfo.productModel;
                      if (productModelInfo === 'emulator') {
                        PreferenceUtil.showToastMessage('请使用真机运行')
                      } else {
                        this.openLocation()
                      }
                    })
                  }.justifyContent(FlexAlign.Center).backgroundColor($r("app.color.system_green")).height('100%').width(100)
                } else {
                  Row() {
                    Text(this.chooseShop).margin({ left: 15 })
                    Image($r("app.media.ic_public_arrow_right")).height(25).width(25).margin({ left: 5 })
                  }.onClick(() => {
                    RouterModule.push({
                      stackName: NavStackMap.MAIN_STACK,
                      url: NavRouterMap.PAGE_SHOP_LIST,
                      animateSwitch: AnimatedMap.ON,
                    })
                  })
                  Text("距离您" + this.chooseShopDistance.toFixed(0) + "米").fontSize(12).fontColor(Color.Gray)
                }

              }
            }

            SegmentButton({
              options: this.singleSelectCapsuleOptions,
              selectedIndexes: $singleSelectCapsuleSelectedIndexes
            }).width(100).margin({ right: 15 })
              .onClick(() => {
                Logger.error("$singleSelectCapsuleSelectedIndexes = " + this.singleSelectCapsuleSelectedIndexes)
              })


          }.justifyContent(FlexAlign.SpaceBetween).width('100%').height(40).margin({ top: 15 })

          Stack({ alignContent: Alignment.BottomStart }) {
            Row() {
              // 左侧导航栏 - 现在使用数据库中的分类
              this.barBuilder()
              // 右侧详情 - 现在使用数据库中的食品数据
              List({ scroller: this.scroller }) {
                ForEach(this.foodCategoryList, (item: string) => {
                  ListItem() {
                    Column() {
                      this.titleBuilder(item)
                      this.foodListBuilder(item)
                    }
                  }
                }, (item: string) => JSON.stringify(item))
              }
              .height('100%')
              .width('calc(100% - 100vp)')
              .padding(16)
              .scrollBar(BarState.Off)
              .onScrollIndex((start, end) => {
                this.currentIndex = start;
              })
            }.width('100%').layoutWeight(1)


            if (this.chickShop) {
              Column() {
                Column() {
                  Row() {
                    Image($r("app.media.ic_public_delete")).width(14).height(14)
                      .onClick(() => {
                        this.buyFoods.clear()
                        this.choosePrice = 0
                        this.chickShop = false
                      })
                    Text("清空").fontSize(14).margin({ left: 3, right: 8 })
                      .onClick(() => {
                        this.buyFoods.clear()
                        this.choosePrice = 0
                        this.chickShop = false
                      })
                  }.justifyContent(FlexAlign.End).width('100%').height(40)


                  Divider()
                  this.shopDetailBuilder()
                }.borderRadius({topLeft: 16, topRight: 16}).borderWidth({top: 0.5}).borderColor(Color.Gray)

                this.shopBuilder()
              }.width('100%')
              .backgroundColor(Color.White)
              .borderRadius(8)
            } else {
              this.shopBuilder()
            }
          }
        }
        Row() {
          Text("美食列表").fontWeight(600).fontSize(18).alignSelf(ItemAlign.Start).margin({ left: 15, top: 20 })
        }.justifyContent(FlexAlign.Start).width('100%').height(50)

        Row() {
          if (this.orderType === OrderType.TAKEOUT) {
            Column() {
              Row() {
                Text(this.chooseTakeOutAddr).margin({ left: 15 })
                Image($r("app.media.ic_public_arrow_right")).height(25).width(25).margin({ left: 5 })
              }.onClick(() => {
                RouterModule.push({
                  stackName: NavStackMap.MAIN_STACK,
                  url: NavRouterMap.PAGE_TAKE_OUT,
                  animateSwitch: AnimatedMap.ON,
                })
              })
              Row() {
                Image($r("app.media.ic_public_postback")).height(15).width(15).margin({ right: 5 })
                  .onClick(() => {
                    RouterModule.push({
                      stackName: NavStackMap.MAIN_STACK,
                      url: NavRouterMap.PAGE_SHOP_LIST,
                      animateSwitch: AnimatedMap.ON,
                    })
                  })
                Text(this.chooseShop + " 配送").fontSize(12).fontColor(Color.Gray)
              }

            }
          } else {
            Column() {
              if (!this.isGetLocation) {
                Row() {
                  Text("开启定位").onClick(async () => {
                    let productModelInfo: string = deviceInfo.productModel;
                    if (productModelInfo === 'emulator') {
                      PreferenceUtil.showToastMessage('请使用真机运行')
                    } else {
                      this.openLocation()
                    }
                  })
                }.justifyContent(FlexAlign.Center).backgroundColor($r("app.color.system_green")).height('100%').width(100)
              } else {
                Row() {
                  Text(this.chooseShop).margin({ left: 15 })
                  Image($r("app.media.ic_public_arrow_right")).height(25).width(25).margin({ left: 5 })
                }.onClick(() => {
                  RouterModule.push({
                    stackName: NavStackMap.MAIN_STACK,
                    url: NavRouterMap.PAGE_SHOP_LIST,
                    animateSwitch: AnimatedMap.ON,
                  })
                })
                Text("距离您" + this.chooseShopDistance.toFixed(0) + "米").fontSize(12).fontColor(Color.Gray)
              }

            }
          }

          SegmentButton({
            options: this.singleSelectCapsuleOptions,
            selectedIndexes: $singleSelectCapsuleSelectedIndexes
          }).width(100).margin({ right: 15 })
            .onClick(() => {
              Logger.error("$singleSelectCapsuleSelectedIndexes = " + this.singleSelectCapsuleSelectedIndexes)
            })


        }.justifyContent(FlexAlign.SpaceBetween).width('100%').height(40).margin({ top: 15 })




      }.width('100%').height('calc(100% - 105vp)')
    }.hideTitleBar(true).backgroundColor(Color.White).margin({ top: this.topRectHeight })
  }

  @Builder
  titleBuilder(item: string) {
    Row() {
      Text(item).fontSize(18).fontColor($r("app.color.system_green")).fontWeight(FontWeight.Bold)
      Blank()
    }
    .width('100%')
    .padding({ top: 16, bottom: 16 })
  }

  @Builder
  barBuilder() {
    Column() {
      ForEach(this.foodCategoryList, (item: string, index: number) => {
        Column() {
          Row({ space: 4 }) {
            Image(this.currentIndex === index ? $r("app.media.icon_selected") : $r('app.media.icon_unselected'))
              .width(10)
              .height(10)
            Text(item).fontColor(this.currentIndex === index ? $r("app.color.system_green") : Color.Black).fontSize(12)
          }
          .onClick(() => {
            this.currentIndex = index;
            this.scroller.scrollToIndex(this.currentIndex);
          })
          .padding({
            top: 20,
            bottom: 20,
          })

          Divider().height(1)
        }.backgroundColor(this.currentIndex === index ? Color.White : null)
      }, (item: string) => JSON.stringify(item))
    }.height('100%').width(100).backgroundColor($r("app.color.system_bg_white"))
  }

  @Builder
  foodListBuilder(category: string) {
    List() {
      ForEach(getFoodListDataMap(this.foodListData).get(category), (foodDetail: FoodDetail) => {
        ListItem() {
          Row() {
            Image(this.getImageSource(foodDetail.pic))
              .height(60)
              .width(60)
              .objectFit(ImageFit.Cover)
              .onError((error) => {
                hilog.error(0x0000, 'FoodCategory', `图片加载失败: ${foodDetail.pic},error:`+ JSON.stringify(error));
              })
            Column() {
              Text(foodDetail.title).fontWeight(600).width('100%')
              Text(foodDetail.desc).fontSize(12).fontColor($r("app.color.food_des_color")).width('100%')
              Text(foodDetail.label).fontSize(12).width('100%')
              Row() {
                Text(foodDetail.price + '').fontWeight(600).fontSize(16)

                Row() {
                  this.buyNumBuilder(foodDetail)
                }
              }.width('100%').height(30).justifyContent(FlexAlign.SpaceBetween)

            }.width('calc(100% - 70vp)')
            .justifyContent(FlexAlign.Start)
            .padding({ top: 5, bottom: 5 })
            .margin({ left: 10 })
          }.height(100)
          .onClick(() => {
            RouterModule.push({
              stackName: NavStackMap.MAIN_STACK,
              url: NavRouterMap.PAGE_FOOD_DETAIL,
              animateSwitch: AnimatedMap.ON,
              param: JSON.stringify(foodDetail)
            })
          })
        }
      }, (item: FoodDetail) => JSON.stringify(item.id))
    }
  }

  @Builder
  shopDetailBuilder() {
    if (this.buyFoods.size > 0) {
      List() {
        ForEach(getBuyFoods(this.buyFoods), (foodDetail: FoodDetail) => {
          ListItem() {
            Row() {
              Image($r(foodDetail.pic)).height(40).width(40).margin({ left: 15 });
              Column() {
                Row() {
                  Text(foodDetail.title);
                }.width('100%')

                Row() {
                  Text(foodDetail.label).fontSize(12)
                }.width('100%');

                Row() {
                  Text('￥' + foodDetail.price * foodDetail.buyNum + '').fontSize(16).fontWeight(600)

                  Row() {
                    this.buyNumBuilder(foodDetail)
                  }
                  .justifyContent(FlexAlign.SpaceBetween)
                  .margin({ right: 65 })

                }.width('100%').height(30)
                .justifyContent(FlexAlign.SpaceBetween);

              }
              .justifyContent(FlexAlign.Start)
              .padding({ top: 5, bottom: 5 })
              .margin({ left: 10 });
            }
            .width('100%')
            .height(80)
            .borderWidth({ top: 2 })
            .borderColor($r("app.color.border_color"))
            .onClick(() => {
              RouterModule.push({
                stackName: NavStackMap.MAIN_STACK,
                url: NavRouterMap.PAGE_FOOD_DETAIL,
                animateSwitch: AnimatedMap.ON,
                param: JSON.stringify(foodDetail)
              })
            })
          };
        }, (item: FoodDetail) => JSON.stringify(item.id));
      };
    }
  }

  // 加入或删除购物车
  @Builder
  buyNumBuilder(foodDetail: FoodDetail) {
    if (this.buyFoods.get(foodDetail.id)) {
      Image($r('app.media.ic_public_remove'))
        .width(25).height(25).objectFit(ImageFit.Fill)
        .onClick(() => {
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
            } else if (item.buyNum == 1) {
              item.buyNum--;
              this.buyFoods.delete(foodDetail.id);
              // this.choosePrice -= foodDetail.price;
              this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
              if (this.choosePrice === 0) {
                this.chickShop = false;
              }
            } else {
              // 提示最低不能低于0
            }
          }
        });
    }

    if (this.buyFoods.get(foodDetail.id)) {
      Text(this.buyFoods.get(foodDetail.id)?.buyNum + "").fontSize(16).margin({ left: 10, right: 10 });
    }

    Image($r('app.media.ic_public_add_norm'))
      .width(25).height(25).objectFit(ImageFit.Fill)
      .onClick(() => {
        // this.choosePrice += foodDetail.price;
        this.choosePrice = addition(this.choosePrice, foodDetail.price);
        let item = this.buyFoods.get(foodDetail.id);
        if (item) {
          item.buyNum++;
          this.buyFoods.set(foodDetail.id, item);
        } else {
          foodDetail.buyNum = 1;
          this.buyFoods.set(foodDetail.id, foodDetail);
        }
      })
  }


  // 悬浮购物车
  @Builder
  shopBuilder() {
    Row() {
      Row() {
        Image($r("app.media.ic_public_shop")).height(40).width(40).margin({ left: 15 })
          .onClick(() => {
            this.chickShop = !this.chickShop;
          });
        Text() {
          Span("￥");
          Span(this.choosePrice + "");
        }.fontSize(16);
      };

      Row() {
        Text("选好了")
          .fontColor(Color.White)
          .onClick(() => {
            RouterModule.push({
              stackName: NavStackMap.MAIN_STACK,
              url: NavRouterMap.PAGE_ORDER_PREVIEW,
              animateSwitch: AnimatedMap.ON
            })
          })
      }
      .justifyContent(FlexAlign.Center)
      .backgroundColor($r('app.color.system_green'))
      .height('80%')
      .width(120)
      .borderRadius(24)
      .margin({ right: 16 })
    }
    .height(50)
    .width('100%')
    .backgroundColor(Color.White)
    .justifyContent(FlexAlign.SpaceBetween)
    .borderWidth({ top: 1 })
    .borderColor($r("app.color.system_bg_white"))
    .visibility(this.choosePrice === 0 ? Visibility.Hidden : Visibility.Visible)
  }
}

export function getBuyFoods(map: Map<string, FoodDetail>) {
  let foods: FoodDetail[] = []
  map.forEach((v: FoodDetail, k: string) => {
    foods.push(v)
  })
  return foods;
}

function getFoodListDataMap(data: FoodList[]): Map<string, FoodDetail[]> {
  const map = new Map<string, FoodDetail[]>();
  data.forEach(item => {
    map.set(item.category, item.list)
  })
  return map;
}