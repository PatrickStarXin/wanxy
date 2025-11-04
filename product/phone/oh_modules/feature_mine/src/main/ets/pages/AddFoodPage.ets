import DatabaseService from 'feature_food';
import { Category } from 'feature_food';
import { hilog } from '@kit.PerformanceAnalysisKit';
import onSelectImageUtil from '../util/onSelectImageUtil'
import { relationalStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import EventManager from 'common_utils/src/main/ets/manager/EventManager';
import { fileIo,fileUri } from '@kit.CoreFileKit';
import SqlConstants from 'common_utils/src/main/ets/constants/SqlConstants';
import { FoodSpecification,
  SpecificationOption,
  SpecificationTheme } from 'common_utils/src/main/ets/viewmodel/Specifications';


interface SelectOption {
  value: string;   // 根据 ArkTS Select 组件要求，value 通常为字符串
  description: string;
}

interface OptionInput {
  name?: string;
  price?: string;
  id: string;
}

interface UpdateOptionInput {
  name?: string;
  price?: string;
}

const TAG = 'AddFoodPage';


@Builder
export function AddFoodPageBuilder() {
  AddFoodPage()
}


@Component
export struct AddFoodPage {
  /*@State addFoodPage: AddFoodPage = new AddFoodPage();*/
  @State foodName: string = '';
  @State foodPrice: string = '';
  @State foodLabel: string = '';
  @State selectedCategoryId: number = 0;
  @State categories: Category[] = []; // 使用 Category 接口类型
  @State imagePath: string = '';
  @State previewImage: PixelMap | Resource | string = $r('app.media.food_main');
  @State tempImageUri: string = '';   // 用于临时存储选择的图片uri
  // 新增规格相关状态
  @State availableThemes: SpecificationTheme[] = [];    // 可用规格主题
  @State selectedThemes: FoodSpecification[] = [];      // 为当前商品选择的规格
  @State showSpecificationModal: boolean = false;       // 显示规格设置弹窗
  @State customThemeName: string = '';                  // 自定义主题名称
  @State customOptionInputs: Map<number,Array<OptionInput> > = new Map();
  @State NullCustomOptionInputs: Map<number,Array<UpdateOptionInput> > = new Map();
//  @State customOptionInputs: Map<number,OptionInput > = new Map();
  private context: common.Context | null = null;

  async aboutToAppear() {
    // 在组件中获取上下文
    try {
      this.context = getContext(this) as common.Context;
      this.loadCategories();
      await DatabaseService.createObjectiveRDB(this.context);
      hilog.info(0x0000, 'FoodCategory.aboutToAppear', '数据库连接成功');
      await DatabaseService.commonCreateTable(SqlConstants.CREATE_SPECIFICATION_THEMES);
      await DatabaseService.commonCreateTable(SqlConstants.CREATE_SPECIFICATION_OPTIONS);
      await DatabaseService.commonCreateTable(SqlConstants.CREATE_FOOD_SPECIFICATIONS);

      await DatabaseService.initSpecificationThemesTable();
      await DatabaseService.initSpecificationOptionsTable();

      // 加载规格主题
      this.loadSpecificationThemes();

    } catch (error) {
      hilog.error(0x0000, 'AddFoodPage', '获取上下文失败: ' + JSON.stringify(error));
    }
  }

  async loadCategories() {
    try {
      this.categories = await DatabaseService.queryAllCategoriesWithId();
      if (this.categories.length > 0) {
        this.selectedCategoryId = this.categories[0].id;
      }
      hilog.info(0x0000, 'AddFoodPage', `加载了 ${this.categories.length} 个分类`);
    } catch (err) {
      console.error('加载分类失败: ' + JSON.stringify(err));
    }
  }

  async saveFood() {
    if (!this.foodName || !this.foodPrice) {
      // 可以使用 Toast 提示用户
      hilog.error(0x0000, 'AddFoodPage_saveFood', '请填写食物名称和价格');
      return;
    }
    // 如果是 fileUri，提取原始路径保存到数据库
    let picPath = this.imagePath;

    // 如果有临时uri，先保存图片
    if (this.tempImageUri) {
      try {
        if (this.context) {
          const savedPath = await onSelectImageUtil.saveImageToSandbox(this.context,this.tempImageUri);
          if (savedPath) {
            // 保存到数据库时使用原始路径，不要使用fileUri转换后的路径
            const originalPath = this.extractOriginalPath(savedPath);
            picPath = originalPath;
            this.imagePath = savedPath;   //  更新正式路径
            this.tempImageUri = '';       // 清空临时URI
          }
        }
      } catch (err) {
        hilog.error(0x0000, 'AddFoodPage_saveFood', '保存图片失败: ' + JSON.stringify(err));
      }
    }

    if (picPath.startsWith('file://')) {
      // 提取原始文件路径
      // picPath = picPath.substring(7); // 去掉 'file://' 前缀
      picPath = this.extractOriginalPath(picPath);
    }


    const valuesBucket: relationalStore.ValuesBucket = {
      TITLE: this.foodName,
      PRICE: parseFloat(this.foodPrice),
      LABEL: this.foodLabel,
      TYPE: this.selectedCategoryId,
      PIC: picPath,  // 保存原始路径
      SALES: 0
    };

    try {
      const foodId = await DatabaseService.insertFood(valuesBucket);
      hilog.info(0x0000, 'AddFoodPage_saveFood', '食品保存成功');

      // 保存规格关联
      for (const spec of this.selectedThemes) {
        await DatabaseService.insertFoodSpecification({
          foodId: foodId,
          themeId: spec.themeId,
          required: spec.required ? 1 : 0
        });

        // 如果选择了全局选项，创建商品特定的选项副本
        // 避免修改全局选项时影响已关联的食物
        // 就是规格数据绑定食品id，不作为全局选项，即 SPECIFICATION_OPTIONS 的 foodid <> 0
        const theme = this.availableThemes.find(t => t.themeId === spec.themeId);
        if (theme) {
          for (const optionId of spec.selectedOptions) {
            const option = theme.options?.find(o => o.optionId === optionId);
            if (option && option.foodId === 0) {
              await DatabaseService.insertCustomOption({
                themeId: spec.themeId,
                foodId: foodId,
                optionName: option.optionName,
                displayName: option.displayName,
                extraPrice: option.extraPrice,
                isDefault: option.isDefault
              });
            }
          }
        }
      }

      // 触发数据变化事件 - 添加延迟确保数据库提交完成
      setTimeout(() => {
        hilog.info(0x0000, 'AddFoodPage_saveFood', '触发数据变化事件');
        EventManager.getInstance().emit('foodDataChanged');
      }, 100);

      this.clearForm();
      // 可以添加成功提示或导航回上一页
    } catch (err) {
      hilog.error(0x0000, 'AddFoodPage', '保存食物失败: ' + JSON.stringify(err));
    }
  }

  // 新增：从file:// URI中提取原始路径
  extractOriginalPath(fileUri: string): string {
    if (fileUri.startsWith('file://')) {
      // 处理 file://wanxy.food.com/... 格式
      if (fileUri.includes('file://wanxy.food.com')) {
        return fileUri.replace('file://wanxy.food.com', '');
      }
      // 处理普通的 file:// 格式
      return fileUri.substring(7);
    }
    return fileUri;
  }

  // 保存选择的图片到应用沙箱
  async saveSelectedImage(uri: string): Promise<string> {
    try {
      if (this.context) {
        const savedPath = await onSelectImageUtil.saveImageToSandbox(this.context,uri);
        hilog.info(0x0000, 'AddFoodPage_saveSelectedImage', `图片保存到沙箱: ${savedPath}`);
        return savedPath;
      }
    } catch (err) {
      hilog.error(0x0000, 'AddFoodPage', '保存图片到沙箱失败: ' + JSON.stringify(err));
    }
    return '';
  }

  clearForm() {
    this.foodName = '';
    this.foodPrice = '';
    this.foodLabel = '';
    this.imagePath = '';
    this.tempImageUri = ''; // 清空临时URI
    this.previewImage = $r('app.media.food_main');
    if (this.categories.length > 0) {
      this.selectedCategoryId = this.categories[0].id;
    }
  }


  // 获取预览图片源
  getTempImageSource(): Resource | string {
    // 优先使用临时URI进行预览
    if (this.tempImageUri) {
      return this.tempImageUri;
    }

    // 其次使用已保存的图片路径
    if (this.imagePath) {
      return this.getPreviewImageSource(this.imagePath);
    }

    // 最后使用默认图片
    return $r('app.media.food_main');
  }

  // 新增：处理图片选择的方法
  async handleImageSelection() {
    if (!this.context) {
      hilog.error(0x0000, 'AddFoodPage', '上下文未初始化，无法选择图片');
      return;
    }

    hilog.info(0x0000, 'AddFoodPage', '开始选择图片...');
    hilog.info(0x0000, 'AddFoodPage', `选择前 tempImageUri: ${this.tempImageUri}`);
    hilog.info(0x0000, 'AddFoodPage', `选择前 imagePath: ${this.imagePath}`);

    try {
      const result = await onSelectImageUtil.onSelectImage(this.context);

      if (result && result.originalUri) {
        hilog.info(0x0000, 'AddFoodPage', `选择结果: ${JSON.stringify(result)}`);

        this.tempImageUri = result.originalUri;
        if (result.savedPath) {
          this.imagePath = result.savedPath;
        }

        hilog.info(0x0000, 'AddFoodPage', `更新后 tempImageUri: ${this.tempImageUri}`);
        hilog.info(0x0000, 'AddFoodPage', `更新后 imagePath: ${this.imagePath}`);
      }
    } catch (error) {
      hilog.error(0x0000, 'AddFoodPage', `选择图片异常: ${JSON.stringify(error)}`);
    }
  }

  // 添加图片预览的方法
  getPreviewImageSource(imagePath: string): Resource | string {
    if (!imagePath) {
      return $r('app.media.food_main');
    }

    // 使用和 FoodCategory 相同的逻辑处理图片路径
    if (!imagePath || imagePath.trim() === '') {
      hilog.info(0x0000, 'FoodCategory_getImageSource', '图片路径为空，使用默认图片');
      return $r("app.media.food_main");
    }
    // 如果是完整的文件路径
    if (imagePath.startsWith('/') || imagePath.startsWith('file://')){
      hilog.info(0x0000, 'FoodCategory_getImageSource', `识别为文件路径: ${imagePath}`);

      try {
        // 检查文件是否存在
        const isFileExist = fileIo.accessSync(imagePath);
        if (isFileExist) {
          hilog.info(0x0000, 'FoodCategory_getImageSource', `文件存在: ${imagePath}`);
          // 使用 fileUri 来访问文件
          return fileUri.getUriFromPath(imagePath);
        }
        else {
          hilog.error(0x0000, 'FoodCategory_getImageSource', `文件不存在: ${imagePath}`);
        }
      } catch (err) {
        hilog.error(0x0000, 'FoodCategory_getImageSource', `文件访问失败: ${imagePath}, error: ${JSON.stringify(err)}`);
      }
      return $r("app.media.food_main");
    }

    // 如果是base64数据uri
    if (imagePath && imagePath.startsWith('data:image')) {
      hilog.info(0x0000, 'FoodCategory', '识别为base64图片');
      return imagePath;
    }
    // 如果是资源路径
    if (imagePath && imagePath.startsWith('app.media.')) {
      hilog.info(0x0000, 'FoodCategory', `识别为资源路径: ${imagePath}`);
      try {
        const resource = $r(imagePath);
        if (resource) {
          return resource;
        }
      } catch (error) {
        hilog.error(0x0000, 'FoodCategory', `资源路径转换失败: ${imagePath}, error: ${JSON.stringify(error)}`);
      }
    }
    // 如果是文件名，没有路径分隔符
    if (imagePath && !imagePath.includes('/') && !imagePath.includes('\\')) {
      // 尝试构建完整路径
      try {
        const context = getContext(this) as common.Context;
        const fullPath = context.filesDir + '/' + imagePath;
        hilog.info(0x0000, 'FoodCategory', `构建完整文件路径: ${fullPath}`);
        return fullPath;
      } catch (err) {
        hilog.error(0x0000, 'FoodCategory', '构建图片路径失败: ' + JSON.stringify(err));
      }
    }
    return $r('app.media.food_main');
  }

  // 加载规格主题
  async loadSpecificationThemes() {
    try {
      // 加载系统预设主题和选项
      const systemThemes = await DatabaseService.querySystemOrCustomThemes(SqlConstants.QUERY_SYSTEM_THEMES_SQL);
      // 加载系统预设主题和选项
      const customThemes = await DatabaseService.querySystemOrCustomThemes(SqlConstants.QUERY_CUSTOM_THEMES_SQL);
      this.availableThemes = [...systemThemes,...customThemes];
    } catch (err) {
      hilog.error(0x0000, 'AddFoodPage', '加载规格主题失败: ' + JSON.stringify(err));
    }
  }

  // 添加自定义主题
  async addCustomTheme() {
    if (!this.customThemeName.trim()) {
      hilog.error(0x0000, TAG, '请输入主题名称');
      return;
    }

    try {
      const newTheme:SpecificationTheme = await DatabaseService.insertCustomTheme({
        themeName: this.customThemeName,
        displayName: this.customThemeName,
        themeType: 'custom',
        required: false,
        multiSelect: false
      });

      this.availableThemes.push(newTheme);
      this.customThemeName = '';
    } catch (err) {
      hilog.error(0x0000, 'AddFoodPage', '添加自定义主题失败: ' + JSON.stringify(err));
    }
  }

  // 给主题添加自定义选项
  async addCustomOption(themeId: number, optionName: string, extraPrice: number) {
    try {
      const newOption = await DatabaseService.insertCustomOption({
        themeId: themeId,
        optionName: optionName,
        displayName: optionName,
        extraPrice: extraPrice,
        isDefault: false
      })
      // 更新本地状态
      const themeIndex = this.availableThemes.findIndex(t => t.themeId === themeId);
      if (themeIndex >= 0) {
        this.availableThemes[themeIndex].options?.push(newOption);
      }
    } catch (err) {
      hilog.error(0x0000, 'AddFoodPage', '添加自定义选项失败: ' + JSON.stringify(err));
    }
  }

  // 给商品添加规格主题
  toggleThemeForFood(theme: SpecificationTheme, shouldBeSelected ?: boolean) {
    // 如果没有传入isSelected状态,切换当前状态
    if(shouldBeSelected === undefined) {
      shouldBeSelected = !this.isThemeSelected(theme);
    }

    const existingIndex = this.selectedThemes.findIndex(st => st.themeId === theme.themeId);

    if (shouldBeSelected && existingIndex < 0) {
      // 需要选中且当前未选中,添加：如果主题不存在就添加，并设置默认选中的选项
      // 明确处理 options 为 undefined 的情况
      // 因为 options 为可选项，所以可能为undefined
      let selectedOptions: number[] = [];
      if (theme.options) {
        selectedOptions = theme.options
          .filter(opt => opt.isDefault)  // 只选择标记为默认的选项
          .map(opt => opt.optionId);
      }
      // 未选择，添加
      this.selectedThemes.push({
        themeId: theme.themeId,
        required: theme.required,
        selectedOptions: selectedOptions  // 默认选中的选项ID数组
      });

      // 初始化选项数组
      if (theme.themeType === 'custom') {
        // 确保每个自定义数组至少有一个空的输入行
        if (!this.customOptionInputs.has(theme.themeId) ||
          this.customOptionInputs.get(theme.themeId)?.length === 0) {
          this.addNewCustomOptionRow(theme.themeId);
        }
      }
    } else {
      // 需要取消选中且当前已选中 → 移除
      this.selectedThemes.splice(existingIndex,1);
    }

    // 触发UI更新
    this.selectedThemes = [...this.selectedThemes];
  }

  // 选择选项的处理 toggleOptionForTheme
  // 检查选项是否被选中
  private isOptionSelected(themeId: number, optionId: number): boolean {
    const themeSpec = this.selectedThemes.find(st => st.themeId === themeId);
    return themeSpec ? themeSpec.selectedOptions.includes(optionId) : false;
  }

  // 切换选项选择状态
  private toggleOptionForTheme(themeId: number, optionId: number, checked: boolean) {
    const themeIndex = this.selectedThemes.findIndex(st => st.themeId === themeId);

    if (themeIndex < 0) {
      // 如果主题未选中，先选中主题
      const theme = this.availableThemes.find(t => t.themeId === themeId);
      if (theme) {
        this.toggleThemeForFood(theme, true);
        // 重新获取索引
        const newIndex = this.selectedThemes.findIndex(st => st.themeId === themeId);
        if (newIndex >= 0 && checked) {
          this.selectedThemes[newIndex].selectedOptions.push(optionId);
        }
      }
      return;
    }

    // 主题已选中，处理选项
    if (checked) {
      // 添加选项
      if (!this.selectedThemes[themeIndex].selectedOptions.includes(optionId)) {
        // 如果是单选主题，先清空其他选项
        const theme = this.availableThemes.find(t => t.themeId === themeId);
        if (theme && !theme.multiSelect) {
          this.selectedThemes[themeIndex].selectedOptions = [optionId];
        } else {
          this.selectedThemes[themeIndex].selectedOptions.push(optionId);
        }
      }
    } else {
      // 移除选项
      const optionIndex = this.selectedThemes[themeIndex].selectedOptions.indexOf(optionId);
      if (optionIndex >= 0) {
        this.selectedThemes[themeIndex].selectedOptions.splice(optionIndex, 1);
      }
    }

    // 触发UI更新
    this.selectedThemes = [...this.selectedThemes];

    hilog.info(0x0000, TAG,
      `主题 ${themeId} 的选项更新: ${this.selectedThemes[themeIndex].selectedOptions.join(',')}`);
  }

  /***
   * 点击 + 添加新的自定义选项输入框
   */
  // 生成唯一id的
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // 添加新的自定义选项行
  private addNewCustomOptionRow(themeId: number) {
    const currentOptions = this.customOptionInputs.get(themeId) || [];
    const newOption : OptionInput= {
      name: '',
      price: '',
      id: this.generateId()
    };
    this.customOptionInputs.set(themeId,[...currentOptions,newOption]);
  }

  // 更新自定义选项
  private updateCustomOption(themeId: number,index: number, updates: UpdateOptionInput) {        // id是 addNewCustomOptionRow 创建的，只需要传入需要更新的属性就行，就不用OptionInput
    // 根据themeId 从 Map 中获取对应的选项数组
    const currentOptions = this.customOptionInputs.get(themeId) || [];

    // 查看索引是否在有效范围
    if (index >= 0 && index < currentOptions.length) {
      // 创建当前数组的浅拷贝
      const updatedOptions = [...currentOptions];
      // 手动复制属性，避免使用 Object.assign
      // 获取要更新的原始选项的对象
      const originalOption = updatedOptions[index];
      // 手动创建新的选项对象
      updatedOptions[index] = {
        id: originalOption.id, // 保留原有 id
        name: updates.name !== undefined ? updates.name : originalOption.name,
        price: updates.price !== undefined ? updates.price : originalOption.price,
      };
      // 将更新后的数组重新设置回 Map 中
      this.customOptionInputs.set(themeId, updatedOptions); // 记得更新 Map
    }
  }

  // 删除自定义选项
  private removeCustomOption(themeId: number, index: number) {
    const currentOptions = this.customOptionInputs.get(themeId) || [];
    if (index >= 0 && index < currentOptions.length) {
      // 使用 filter 方法创建新数组，排除指定索引的元素
      // i !== index：条件表达式，只保留索引不等于要删除的索引的元素
      const updatedOptions = currentOptions.filter((_, i) => i !== index);
      this.customOptionInputs.set(themeId, updatedOptions);
    }
  }



  build() {
    NavDestination() {
      Stack() {
        Scroll() {
          Column({ space: 20 }) {
            // 图片选择区域
            Column() {
              Image(this.getTempImageSource())
                .width('100%')
                .height(200)// 设置固定高度或使用百分比
                .objectFit(ImageFit.Cover)
                .onClick(() => {
                  this.handleImageSelection();
                })
                .onError((error) => {
                  hilog.error(0x0000, 'AddFoodPage',
                    `预览图片加载失败: ${this.imagePath}, error: ${JSON.stringify(error)}`);
                })
            }
            .padding(20)

            //.border({ width: 1, color: Color.Gray })

            // 表单输入
            TextInput({ placeholder: '食物名称', text: this.foodName })
              .width('90%')
              .onChange((value: string) => {
                this.foodName = value;
              })

            TextInput({ placeholder: '价格', text: this.foodPrice })
              .width('90%')
              .type(InputType.Number)
              .onChange((value: string) => {
                this.foodPrice = value;
              })

            TextInput({ placeholder: '标签描述', text: this.foodLabel })
              .width('90%')
              .onChange((value: string) => {
                this.foodLabel = value;
              })

            // 分类选择
            Text('选择分类:')
              .width('90%')
              .fontSize(16)
              .fontColor(Color.Black)

            // 使用 Picker 或 Select 组件
            if (this.categories.length > 0) {
              Select(this.categories.map((item): SelectOption => {
                return { value: item.category.toString(), description: item.category };
              }))
                .width('90%')
                .selected(this.categories.findIndex(item => item.id === this.selectedCategoryId))
                .onSelect((index: number) => {
                  this.selectedCategoryId = this.categories[index].id;
                })
            } else {
              Text('暂无分类')
                .width('90%')
                .fontSize(14)
                .fontColor(Color.Gray)
            }

            // 新增规格设置按钮
            Row() {
              Text('商品规格设置')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
              Blank()
              Button('设置规格')
                .onClick(() => {
                  this.showSpecificationModal = true;
                })
            }
            .width('90%')
            .padding(10)

            // 显示已选择的规格
            if (this.selectedThemes.length > 0) {
              Column() {
                Text('已选择规格： ')
                  .fontSize(14)
                  .fontColor(Color.Gray)
                ForEach(this.selectedThemes, (spec: FoodSpecification) => {
                  //如果 theme 是 SpecificationTheme 对象（非 null、非 undefined），条件为 true
                  // 如果 theme 是 undefined（没找到匹配项），条件为 false
                  if (this.isFoodSpecificationSelected(spec)) {
                    Text(`${this.isFoodSpecificationSelected(spec)?.displayName} : ${spec.selectedOptions.length} 个选项`)
                      .fontSize(12)
                      .fontColor(Color.Blue)
                  }
                })
              }
              .width('90%')
              .padding(10)
              .backgroundColor($r('app.color.system_bg_white'))
              .borderRadius(4)
            }

            // 操作按钮
            Row({ space: 40 }) {
              Button('保存')
                .onClick(() => this.saveFood())
                .backgroundColor($r('app.color.system_green'))

              Button('清空')
                .onClick(() => this.clearForm())
                .backgroundColor(Color.Gray)
            }
            .margin({ top: 30 })
          }
          .width('100%')
          .padding(20)
        }
        .width('100%')
        .height('100%')
        .scrollBar(BarState.On) // 显示滚动条
        .scrollable(ScrollDirection.Vertical) // 确保垂直滚动


        // 模态框放在Stack的顶层，通过条件控制显示
        if (this.showSpecificationModal) {
          // 半透明背景遮罩

            Column() {
              // 空背景，点击可关闭
            }
            .width('100%')
            .height('100%')
            .backgroundColor(Color.Black)
            .opacity(0.3)
            .onClick(() => {
              this.showSpecificationModal = false;
            })
          Scroll() {
            // 模态框内容
            Column() {
              // 模态框标题
              Row() {
                Text('商品规格设置')
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                Blank()
                Image($r('app.media.ic_public_delete'))
                  .width(20)
                  .height(20)
                  .onClick(() => {
                    this.showSpecificationModal = false;
                  })
              }
              .width('100%')
              .padding(16)

              Divider()

              // 系统预设规格
              Column() {
                Text('系统预设规格')
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .margin({ bottom: 10 })
                ForEach(this.availableThemes.filter(t => t.themeType === 'system'),
                  (theme: SpecificationTheme) => {
                    this.themeItemBuilder(theme)
                  })
              }
              .width('100%')
              .padding(16)

              // 自定义规格
              Column() {
                Text('自定义规格')
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .margin({ bottom: 10 })

                // 添加自定义主题
                Row() {
                  TextInput({ placeholder: '输入规格名称', text: this.customThemeName })
                    .layoutWeight(1)
                    .onChange((value: string) => {
                      this.customThemeName = value;
                    })
                  Button('添加')
                    .onClick(() => {
                      this.addCustomTheme();
                    })
                }

                ForEach(this.availableThemes.filter(t => t.themeType === 'custom'),
                  (theme: SpecificationTheme) => {
                    this.themeItemBuilder(theme)
                  })
              }
              .width('100%')
              .padding(16)

              Row({ space: 20 }) {
                Button('完成')
                  .onClick(() => {
                    this.showSpecificationModal = false;
                  })
                  .backgroundColor($r('app.color.system_green'))
              }
              .margin({ top: 20 })
            }
          }
          .scrollBar(BarState.On) // 显示滚动条
          .scrollable(ScrollDirection.Vertical) // 确保垂直滚动
          .width('90%')
          .height('70%')
          .backgroundColor(Color.White)
          .borderRadius(8)
          .padding(10)
          //.alignItems(HorizontalAlign.Center)
          .align(Alignment.Center)
          .position({ x: '5%', y: '15%' }) // 居中定位
        }
      }
      .width('100%')
      .height('100%')
      // 规格设置模态框
      //this.specificationModelBuilder()// 规格设置模态框
    }
    .title('添加食物')
    .padding({ top: 20 }) // 给标题栏增加上边距
  }

  // 规格设置弹窗
  /*@Builder
  specificationModelBuilder() {
    if (this.showSpecificationModal) {
      Column() {
        // 模态框标题
        Row() {
          Text('商品规格设置')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
          Blank()
          Image($r('app.media.ic_public_delete'))
            .width(20)
            .height(20)
            .onClick(() => {
              this.showSpecificationModal = false;
            })
        }
        .width('100%')
        .padding(16)

        Divider()

        Column() {
          Text('系统预设规格')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 10 })
          ForEach(this.availableThemes.filter(t => t.themeType === 'system'),
          (theme: SpecificationTheme) => {
            this.themeItemBuilder(theme)
          })
        }
        .width('100%')
        .padding(16)

        // 自定义规格
        Column() {
          Text('自定义规格')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 10 })

          // 添加自定义主题
          Row() {
            TextInput({ placeholder: '输入规格名称',text: this.customThemeName})
              .layoutWeight(1)
              .onChange((value: string) => {
                this.customThemeName = value;
              })
            Button('添加')
              .onClick(() => {
                this.addCustomTheme();
              })
          }

          ForEach(this.availableThemes.filter(t => t.themeType === 'custom'),
            (theme: SpecificationTheme) => {
            this.themeItemBuilder(theme)
            })
        }
        .width('100%')
        .padding(16)

        Row({ space: 20}) {
          Button('完成')
            .onClick(() =>{
              this.showSpecificationModal = false;
            })
            .backgroundColor($r('app.color.system_green'))
        }
        .margin({ top: 20 })
      }
      .width('90%')
      .height('80%')
      .backgroundColor(Color.White)
      .borderRadius(8)
      .padding(10)
    }
  }*/

  @Builder
  themeItemBuilder(theme: SpecificationTheme) {

      Column() {
        // 主题选择行
        Row() {
          Text(theme.displayName)
            .fontSize(14)
            .layoutWeight(1)
          Toggle({ type: ToggleType.Checkbox, isOn: this.isThemeSelected(theme)})
            .onChange((checked: boolean) => {   // 方式1：Toggle切换时调用
              this.toggleThemeForFood(theme,checked);  // 切换主题选择状态
            })
        }
        .width('100%')
        .padding(8)
        .backgroundColor(this.isThemeSelected(theme) ? $r('app.color.system_bg_white') : Color.Transparent)
        .onClick(() => {    // 方式2：整行点击时调用
          this.toggleThemeForFood(theme);
        })

        // 选项列表（如果已选择）
        //作用：只有当选中的主题才展开显示其下的具体选项
        // 意义：避免界面过于拥挤，按需展示内容
        if (this.isThemeSelected(theme)) {
          Column() {
            ForEach(theme.options, (option:SpecificationOption) => {
              Row() {
                Text(option.displayName)
                  .fontSize(12)
                Text(`+￥${option.extraPrice}`)
                  .fontSize(12)
                  .fontColor(Color.Gray)
                Blank()
                Toggle({
                  type: ToggleType.Checkbox,
                  isOn: this.selectedThemes
                    .find(st => st.themeId === theme.themeId)
                  ?.selectedOptions.includes(option.optionId) || false
                })
                  .onChange((checked: boolean) => {
                    this.toggleThemeForFood(theme,checked);
                  })
              }
              .width('100%')
              .padding(4)
            })

            // 添加自定义选项 (仅自定义主题)
            // 作用：只为自定义规格提供添加新选项的功能
            if (theme.themeType === 'custom') {
              Column() {

                // 显示所有已存在的自定义选项输入框
                ForEach(this.customOptionInputs.get(theme.themeId), (optionInput :OptionInput, index: number) => {
                  Row() {
                    TextInput({
                      placeholder: '选项名称',
                      text: optionInput.name
                    })
                      .layoutWeight(1)
                      .onChange((value: string) => {
                        this.updateCustomOption(theme.themeId, index, {name: value});       // 只传入需要修改的数据
                      })
                    TextInput({
                      placeholder: '￥',
                      text: optionInput.price
                    })
                      .width(60)
                      .onChange((value: string) => {
                        this.updateCustomOption(theme.themeId,index, {price: value});       // 只传入需要修改的数据
                      })
                    // 删除按钮
                    if ((this.customOptionInputs.get(theme.themeId)?.length || 0) > 1) {
                      Button('-')
                        .backgroundColor(Color.Red)
                        .fontColor(Color.White)
                        .width(30)
                        .height(30)
                        .onClick(() => {
                          this.removeCustomOption(theme.themeId, index);
                        })
                    }else {
                      // 占位，保持布局一致
                      Blank()
                        .width(30)
                        .height(30)
                    }
                  }
                })
                Row() {
                  Blank()
                  Button('+')
                    .onClick(() => {
                      this.addNewCustomOptionRow(theme.themeId)
                    })
                }
              }
            }
          }
          .padding({ left: 20 })
        }
      }
      .width('100%')
      .border({ width: 1, color: Color.Gray })
      .borderRadius(4)
      .margin({ bottom: 10 })
  }

  private isThemeSelected(theme: SpecificationTheme): boolean {
    return this.selectedThemes.some(st => st.themeId === theme.themeId);
  }

  private isFoodSpecificationSelected(spec: FoodSpecification): SpecificationTheme | undefined {
    return this.availableThemes.find(t => t.themeId === spec.themeId);
  }
}

/*@Component
struct CustomOptionComponent {
  @Prop theme: SpecificationTheme;
  @State customOptionInputs: Map<number,OptionInput > = new Map();
  // 子组件需要通过 Props（属性） 来接收父组件的数据和方法
  @Prop isThemeSelected: (theme: SpecificationTheme) => boolean;           // 方法
  @Prop selectedThemes: FoodSpecification[];                              // 数据
  @Prop toggleThemeForFood: (theme: SpecificationTheme, shouldBeSelected?: boolean) => void; // 方法
  @Prop addCustomOption: (themeId: number, optionName: string, extraPrice: number) => void;  // 方法

  aboutToAppear() {
    // 在这里使用theme进行初始化是安全的
    if (this.theme.themeType === 'custom' && !this.customOptionInputs.has(this.theme.themeId)) {
      this.customOptionInputs.set(this.theme.themeId, { name: '', price: '' });
    }
  }



}*/




















