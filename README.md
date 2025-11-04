# 餐饮美食类行业实践

## 简介
本实践为餐饮美食类行业实践，包含外卖、店铺地图展示、店铺选择、商品列表，下单、扫码选择店铺、海报等功能。主要包含首页，地图，美食，我的，订单
几个模块。




## 效果预览

 ![](screenshots/image.gif)




## 约束与限制
1. 本示例仅支持标准系统上运行，支持设备：华为手机。
2. DevEco Studio版本：DevEco Studio 5.0.1 Release及以上。
3. HarmonyOS SDK版本：HarmonyOS 5.0.1 Release SDK及以上。





## 使用说明
1. 在AGC创建元服务，并且开通地图、定位、Location、账号权限。
2. 修改AppScope/app.json5里面的bundleName为刚才创建的包名
3. 配置根目录下build-profile.json5的签名信息，以及/product/phone/src/main/module.json5中的clientId。

## 实现思路
### 点餐代码实现
#### 点餐并加入购物车中
```
// feature/feature_food/src/main/ets/components/FoodCategory.ets
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
            this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
            if (this.choosePrice === 0) {
              this.chickShop = false;
            }
          } else if (item.buyNum == 1) {
            item.buyNum--;
            this.buyFoods.delete(foodDetail.id);
            this.choosePrice = subtraction(this.choosePrice, foodDetail.price);
            if (this.choosePrice === 0) {
              this.chickShop = false;
            }
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
```
进行付款，并生成已完成订单。
```
// feature/feature_order/src/main/ets/pages/PageOrderPreview.ets
.onClick(async () => {
  // 模拟付款
  this.enableLoading = true
  setTimeout(() => {
    this.enableLoading = false
    // 生成订单
    let key = Date.parse(new Date().toString()) + ""
    let value: FoodDetail[] = []
    this.buyFoods.forEach((detail: FoodDetail) => {
      value.push(detail)
    })
    Logger.info("key is :" + key)
    Logger.info("value is :" + JSON.stringify(value))

    let dataPreferences: preferences.Preferences | null = PreferenceUtil.getPreference(this.context, 'food.order')
    dataPreferences.putSync(key, JSON.stringify(new OrderDetail("FD" + key, this.choosePrice, this.orderType, this.chooseShop, this.chooseTakeOutAddr, key, OrderStatus.COMMITED, value)))
    dataPreferences.flush()

    // 清理购物车
    this.choosePrice = 0
    this.buyFoods.clear()

    // 跳转订单页
    this.selectedIndex = 2
    RouterModule.push({
      stackName: NavStackMap.MAIN_STACK,
      url: NavRouterMap.PAGE_MAIN,
      animateSwitch: AnimatedMap.ON,
    })

    PreferenceUtil.showToastMessage("下单成功")
  }, 2000)
}
```
#### 餐饮店地址选择
使用Map Kit（地图服务）和Location Kit（位置服务），加载地图，初始化请求附近的地点，匹配当前位置与最近的门店。
```
// feature/feature_map/src/main/ets/pages/PageShopList.ets
// 页面初始化加载地图
aboutToAppear(): void {
  this.preChooseShop = this.chooseShop

  // 初始化请求附近的地点
  this.shopList = ShopDetailList
  this.latitude = getShopByName(this.chooseShop).latitude
  this.longitude = getShopByName(this.chooseShop).longitude
  let gcj02Position = MapUtil.convertToGcj02(this.latitude, this.longitude)

  // 地图初始化参数
  this.mapOptions = {
    position: {
      target: {
        latitude: gcj02Position.latitude,
        longitude: gcj02Position.longitude
      },
      zoom: 16,
    },
    myLocationControlsEnabled: true
  };

  this.callback = async (err, mapController) => {
    if (!err) {
      this.mapController = mapController;
      for (let i = 0; i < this.shopList.length; i++) {
        let gcj02Position = MapUtil.convertToGcj02(this.shopList[i].latitude, this.shopList[i].longitude)
        // 创建Marker
        let markerOptions: mapCommon.MarkerOptions = {
          position: {
            latitude: gcj02Position.latitude,
            longitude: gcj02Position.longitude
          },
          rotation: 0,
          visible: true,
          zIndex: 0,
          alpha: 1,
          anchorU: 0.5,
          anchorV: 1,
          clickable: true,
          draggable: true,
          flat: false
        };
        this.mapController.addMarker(markerOptions);
      }
    }
  };
}
```
## 工程目录

```
├── common
│  ├── common_utils/src/main/ets/
│  │   ├── constants                      // 常量类
│  │   │   └── CommonConstatns.ets        // 通用常类 
│  │   ├── model                          // 模型
│  │   │   └── OrderType.ets              // 订单类型
│  │   └── utils                          // 工具类
│  │       ├── Logger.ets                 // 日志工具类
│  │       ├── MathUtil.ets               // 数学工具类
│  │       ├── PermissionsUtil.ets        // 权限工具类
│  │       └── PreferenceUtil.ets         // 首选项工具类
│  └── router_manage/src/main/ets/
│      ├── commons                        // 常量类
│      │   ├── AnimateMap.ets             // 枚举 
│      │   ├── NavRouterMap.ets           // 页面常类 
│      │   └── NavStackMap.ets            // 主页面常类 
│      └── models                         // 模型
│         ├── NavRouterInfo.ets           // 路由类
│         └── RouterModule.ets            // 路由工具类
├── feature
│   ├── featre_food/src/main/ets/
│   │   ├── components                     // 组件
│   │   │   └── FoodCategory.ets           // 美食组件
│   │   ├── models                         // 模型
│   │   │   └── FoodModelData.ts           // 美食数据
│   │   └── pages                          // 页面
│   │       └── PageFoodDetail.ets         // 美食详情页面
│   ├── featre_home/src/main/ets/
│   │   ├── components                     // 组件
│   │   │   └── HomeComponent.ets          // 首页组件
│   │   ├── models                         // 模型
│   │   │   └── TakeOutAddressInfo.ets     // 外卖地址数据
│   │   └── pages                          // 页面
│   │       ├── PageAddAddress.ets         // 新增外卖地址
│   │       └── PageTakeOut.ets            // 外卖地址列表
│   ├── featre_map/src/main/ets/
│   │   ├── utils                          // 工具类
│   │   │   └── MapUtil.ets                // 地图工具类
│   │   ├── models                         // 模型
│   │   │   └── ShopModelData.ts           // 店铺数据
│   │   └──pages                           // 页面
│   │       └── PageShopList.ets           // 店铺选择页面
│   ├── featre_mine/src/main/ets/
│   │   ├── components                     // 组件
│   │   │   └── MineComponent.ets          // 我的组件
│   │   └── models                         // 模型
│   │       └── MineConfig.ets             // 我的数据
│   └── featre_order/src/main/ets/
│       ├── components                     // 组件
│       │   └── PageOrderList.ets          // 订单组件
│       ├── models                         // 模型
│       │   └── OrderInfo.ets              // 订单数据
│       └── pages                          // 页面
│           └── PageOrderPreview.ets       // 订单预览页面
└── product
    └── phone/src/main/ets
       ├── food                            // 页面
       │   └──pages
       │      └── FoodCard.ets             // 卡片页面
       ├── phoneability                    // 启动入口
       │   └── PhoneAbility.ets            // 手机启动入口
       ├── phoneformability                // 卡片启动入口
       │   └── PhoneFormAbility.ets        // 手机卡片启动入口
       └── pages                           // 页面
           ├── Index.ets                   // 首页
           └── Main.ets                    // 主页面
```
## 模块依赖
无




## 参考文档
[分层模块化实践](https://developer.huawei.com/consumer/cn/doc/architecture-guides/practice-common-app-layered-v1-0000001916033058)   
[公共关键技术方案](https://developer.huawei.com/consumer/cn/doc/architecture-guides/practice-common-app-architecture-v1-0000001944207793)  
[Map Kit（地图服务）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/map-kit-guide-V5)  
[Location Kit（位置服务）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/location-kit-V5)


## Changelog
|修改内容       |时间     |
|------------|--------|
|screenshots与README修改 |2025.1.22|