import DatabaseService, { FoodDetail } from "feature_food"
import EventManager from 'common_utils/src/main/ets/manager/EventManager';
import { common } from "@kit.AbilityKit";
import { GoalItem } from "common_utils/src/main/ets/viewmodel/GoalItem";
import { hilog } from "@kit.PerformanceAnalysisKit";
import { fileIo, fileUri, picker } from "@kit.CoreFileKit";
import { AnimatedMap, NavRouterMap, NavStackMap, RouterModule } from "router_manage";


@Builder
export function FoodManagePageBuilder() {
  FoodManagePage()
}


@Component
export struct FoodManagePage {
  @State foodListData: FoodDetail[] = [];
  @State isLoading: boolean = false;
  @State loadError: boolean = false;
  @State deletingId: string = '';     // 正在删除的项目id

  private context: common.UIAbilityContext | null = null;

  private foodDataChangedCallback: () => void =() => {
  hilog.info(0x0000, 'FoodManagePage', '收到数据变化通知，刷新数据');
  this.loadFoodDataFromDB(); // 重新加载数据
  };



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
    } catch (err) {
      hilog.error(0x0000, 'FoodManagePage', '从数据库加载食品数据失败: ' + JSON.stringify(err));
      this.loadError = true;
      this.foodListData = [];
    } finally {
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
        pic: item.pic, // 这里已经是 base64 字符串或资源路径
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

  // 手动刷新
  async manualRefresh() {
    hilog.info(0x0000, 'FoodManagePage', '手动刷新数据');
    await this.loadFoodDataFromDB();
  }

  build() {
    NavDestination() {
      Column() {
        // 标题栏
        Row() {
          Text("食品管理")
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.Black)

          Blank()

          // 刷新按钮
          Button('刷新')
            .fontSize(14)
            .backgroundColor(Color.Transparent)
            .onClick(() => {
              this.manualRefresh();
            })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 12, bottom: 12 })
        .backgroundColor(Color.White)

        // 加载状态
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
        // 错误状态
        else if (this.loadError) {
          Column() {
            Image($r("app.media.food_main"))
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
        // 空状态
        else if (this.foodListData.length === 0) {
          Column() {
            Image($r("app.media.food_main"))
              .width(80)
              .height(80)
            Text('暂无食品数据')
              .fontSize(16)
              .margin({ top: 16 })
              .fontColor(Color.Gray)
            Button('添加食品')
              .onClick(() => {
                // 跳转到添加食品页面
                RouterModule.push({
                  stackName: NavStackMap.MAIN_STACK,
                  url: NavRouterMap.ADD_FOOD_PAGE, // 需要确认你的添加食品页面路由
                  animateSwitch: AnimatedMap.ON,
                })
              })
              .margin({ top: 20 })
              .backgroundColor($r('app.color.button_blue'))
          }
          .width('100%')
          .height(300)
          .justifyContent(FlexAlign.Center)
        }
        // 数据列表
        else {
          List({ space: 10 }) {
            ForEach(this.foodListData, (foodDetail: FoodDetail) => {
              ListItem() {
                this.FoodListItem(foodDetail);
              }
              // 使用SwipeAction实现滑动删除
              .swipeAction({
                end: this.DeleteSwipeButton(foodDetail)    // 传入 Builder 函数，不是直接调用异步函数
              })
            }, (item: FoodDetail) => item.id)
          }
          .width('100%')
          .layoutWeight(1)
          .padding(16)
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor($r("app.color.system_bg_white"))
    }
    .title('食品管理')
    .padding({ top: 20 }) // 给标题栏增加上边距
    .backgroundColor(Color.White)
  }

  @Builder
  FoodListItem(foodDetail: FoodDetail) {
    Row() {
      // 食品图片
      Image(this.getImageSource(foodDetail.pic))
        .height(60)
        .width(60)
        .objectFit(ImageFit.Cover)
        .borderRadius(8)
        .onError((error) => {
          hilog.error(0x0000, 'FoodManagePage', `图片加载失败: ${foodDetail.pic}, error: ${JSON.stringify(error)}`);
        })

      // 食品信息
      Column() {
        Text(foodDetail.title)
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .fontColor(Color.Black)
          .width('100%')

        Text(foodDetail.desc)
          .fontSize(12)
          .fontColor($r("app.color.food_des_color"))
          .width('100%')
          .margin({ top: 4 })

        Text(foodDetail.label)
          .fontSize(12)
          .fontColor(Color.Gray)
          .width('100%')
          .margin({ top: 2 })

        Row() {
          Text('￥' + foodDetail.price)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor($r("app.color.system_green"))

          Blank()

          Text(foodDetail.category)
            .fontSize(12)
            .fontColor(Color.Gray)
        }
        .width('100%')
        .margin({ top: 8 })
      }
      .layoutWeight(1)
      .margin({ left: 12 })
      .justifyContent(FlexAlign.SpaceBetween)
      .onClick(() => {
        RouterModule.push({
          stackName: NavStackMap.MAIN_STACK,
          url: NavRouterMap.PAGE_FOOD_DETAIL,
          animateSwitch: AnimatedMap.ON,
          param: JSON.stringify(foodDetail)
        })
      })
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 4, color: '#1A000000', offsetX: 0, offsetY: 2 })
  }

  @Builder
  DeleteSwipeButton(foodDetail: FoodDetail) {
    Button('删除')
    .width(80)
    .height('100%')
    //.backgroundColor($r('app.color.system_red'))
    .onClick(() => {
      // 在点击事件中调用删除函数，而不是直接在end属性中调用
      this.showDeleteConfirmDialog(foodDetail);
    })
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
        backgroundColor: $r('app.color.system_red'),
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

}















