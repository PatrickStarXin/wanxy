import relationalStore from "@ohos:data.relationalStore";
import hilog from "@ohos:hilog";
import SqlConstants from "@normalized:N&&&common_utils/src/main/ets/constants/SqlConstants&1.0.0";
import type { BusinessError as BusinessError } from "@ohos:base";
import { GoalItem } from "@normalized:N&&&common_utils/src/main/ets/viewmodel/GoalItem&1.0.0";
import EventManager from "@normalized:N&&&common_utils/src/main/ets/manager/EventManager&1.0.0";
import type { InsertFoodSpecification, InsertSpecificationOption, InsertSpecificationTheme, SpecificationOption, SpecificationTheme } from "../viewmodel/Specifications";
const DB_NAME = 'food.db';
const TAG = '数据库';
// 定义 Category 接口
export interface Category {
    id: number;
    category: string;
}
export class DatabaseService {
    static objectiveRDB?: relationalStore.RdbStore;
    private static instance: DatabaseService = new DatabaseService();
    static getInstance(): DatabaseService {
        return DatabaseService.instance;
    }
    // 1. 获取RdbStore实例，创建数据表并初始化数据表
    async createObjectiveRDB(context: Context): Promise<void> {
        const STORE_CONFIG: relationalStore.StoreConfig = {
            name: DB_NAME,
            securityLevel: relationalStore.SecurityLevel.S1,
        };
        return new Promise((resolve, reject) => {
            /*
             * callback: AsyncCallback<RdbStore>
             * 作用：异步回调函数，用于接收操作结果，成功返回RdbStore对象，失败时返回错误信息
             *
             * 回调函数中的rdbStore: relationalStore.RdbStore，
             * 作用是接收异步操作成功后返回的数据库操作对象，用于后续所有数据库操作对象
             * 获取后可以立即使用，操作数据库
             * 保存到全局变量或类的成员变量中，以便后续复用
             * 显示声明的作用是：让编译器检查类型，避免后续代码中误用该对象，并保持代码可读性，明确告诉开发者，这是一个数据库操作对象
             *
             * 异步回调遵循常见的（err,result）模式，
             * err：表示操作失败时的错误对象（BusinessError）
             * result：表示操作成功时返回的对象（rdbStore表示操作成功时返回的数据操作对象）
             */
            relationalStore.getRdbStore(context, STORE_CONFIG, (err, rdbStore) => {
                if (err) {
                    hilog.error(0x0000, TAG, `连接数据库失败: ${err.code} - ${err.message}`);
                    reject(err);
                }
                else {
                    DatabaseService.objectiveRDB = rdbStore;
                    hilog.info(0x0000, TAG, '数据库连接成功');
                    resolve();
                }
            });
        });
    }
    /*
      // 在DatabaseService中添加清理方法
      async clearAndReinitSpecificationData(): Promise<void> {
        if (!DatabaseService.objectiveRDB) {
          return;
        }
    
        try {
          // 删除现有数据
          await DatabaseService.objectiveRDB.executeSql('DELETE FROM SPECIFICATION_OPTIONS');
          await DatabaseService.objectiveRDB.executeSql('DELETE FROM SPECIFICATION_THEMES');
    
          hilog.info(0x0000, TAG, '已清理规格主题和选项数据');
    
          // 重新初始化
          await this.initSpecificationThemesTable();
          await this.initSpecificationOptionsTable();
    
        } catch (err) {
          hilog.error(0x0000, TAG, `清理和重新初始化数据失败: ${err}`);
        }
      }
    */
    // 建表
    async createFoodInfoTable(): Promise<void> {
        return DatabaseService.objectiveRDB?.execute(SqlConstants.CREATE_FOOD_INFO_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, '创建FOOD_INFO表成功');
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `创建表失败: ${err.code} - ${err.message}`);
        });
    }
    async createFoodCategoryTable(): Promise<void> {
        return DatabaseService.objectiveRDB?.execute(SqlConstants.CREATE_FOOD_CATEGORY_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, '创建FOOD_CATEGORY表成功');
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `创建表失败: ${err.code} - ${err.message}`);
        });
    }
    async createOrderInfoTable(): Promise<void> {
        return DatabaseService.objectiveRDB?.execute(SqlConstants.CREATE_ORDER_INFO_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, '创建ORDER_INFO表成功');
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `创建表失败: ${err.code} - ${err.message}`);
        });
    }
    async commonCreateTable(createSql: string): Promise<void> {
        return DatabaseService.objectiveRDB?.execute(createSql)
            .then(() => {
            hilog.info(0x0000, TAG, `执行建表语句成功：${createSql}}`);
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `执行建表语句失败,sql:${createSql} ,code: ${err.code}, message: ${err.message}`);
        });
    }
    /***
     * 初始化数据
     */
    // 初始化食物信息表
    async initFoodInfoTable(): Promise<void> {
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return;
        }
        // 先检查是否已有数据
        const count = await DatabaseService.getFoodInfoCount();
        if (count > 0) {
            hilog.info(0x0000, TAG, 'FOOD_INFO表已有数据，跳过初始化');
            return;
        }
        const foodInfoOne: relationalStore.ValuesBucket = {
            "id": "1",
            "title": "回锅肉",
            "sales": "10",
            "price": 8,
            "pic": "app.media.food_1",
            "label": "味道好极了",
            "type": 1
        };
        const foodInfoTwo: relationalStore.ValuesBucket = {
            "id": "2",
            "title": "仔姜牛肉",
            "sales": "10",
            "price": 8,
            "pic": "app.media.food_2",
            "label": "味道好极了",
            "type": 2
        };
        const foodInfoThree: relationalStore.ValuesBucket = {
            "id": "3",
            "title": "姜爆鸭",
            "sales": "10",
            "price": 8,
            "pic": "app.media.food_3",
            "label": "味道好极了",
            "type": 2
        };
        const valueBuckets = [foodInfoOne, foodInfoTwo, foodInfoThree];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库初始化失败');
            return;
        }
        try {
            const insertNum = await DatabaseService.objectiveRDB?.batchInsert('FOOD_INFO', valueBuckets);
            hilog.info(0x0000, TAG, `food_info 表数据插入成功，插入数据行数：${insertNum}`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `food_info 表数据插入失败: ${businessErr.code} - ${businessErr.message}`);
        }
    }
    // 初始化分类表
    async initFoodCategoryTable(): Promise<void> {
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return;
        }
        // 先检查是否已有数据
        const count = await DatabaseService.getFoodCategoryCount();
        if (count > 0) {
            hilog.info(0x0000, TAG, 'FOOD_CATEGORY表已有数据，跳过初始化');
            return;
        }
        const categoryDataOne: relationalStore.ValuesBucket = {
            'id': 1,
            'category': '炒菜'
        };
        const categoryDataTwo: relationalStore.ValuesBucket = {
            'id': 2,
            'category': '汤'
        };
        const categoryDataThree: relationalStore.ValuesBucket = {
            'id': 3,
            'category': '面'
        };
        const valueBuckets = [categoryDataOne, categoryDataTwo, categoryDataThree];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库初始化失败');
            return;
        }
        try {
            const insertNum = await DatabaseService.objectiveRDB?.batchInsert('FOOD_CATEGORY', valueBuckets);
            hilog.info(0x0000, TAG, `FOOD_CATEGORY 表数据插入成功，插入数据行数：${insertNum}`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `FOOD_CATEGORY 表数据插入失败: ${err.code} - ${err.message}`);
        }
    }
    // 初始化预设主题
    async initSpecificationThemesTable(): Promise<void> {
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return;
        }
        const count = await DatabaseService.getSpecificationThemesCount();
        if (count > 0) {
            hilog.info(0x0000, TAG, 'SPECIFICATION_THEMES表已有数据，跳过初始化');
            return;
        }
        const specificationThemesDataOne: relationalStore.ValuesBucket = {
            'THEME_ID': 1,
            'THEME_NAME': 'SIZE',
            'DISPLAY_NAME': '规格',
            'THEME_TYPE': 'system',
            'REQUIRED': 1,
            'MULTI_SELECT': 0,
            'SORT_ORDER': 1
        };
        const specificationThemesDataTwo: relationalStore.ValuesBucket = {
            'THEME_ID': 2,
            'THEME_NAME': 'temperature',
            'DISPLAY_NAME': '温度',
            'THEME_TYPE': 'system',
            'REQUIRED': 0,
            'MULTI_SELECT': 0,
            'SORT_ORDER': 2
        };
        const specificationThemesDataThree: relationalStore.ValuesBucket = {
            'THEME_ID': 3,
            'THEME_NAME': 'sweetness',
            'DISPLAY_NAME': '甜度',
            'THEME_TYPE': 'system',
            'REQUIRED': 0,
            'MULTI_SELECT': 0,
            'SORT_ORDER': 3
        };
        const specificationThemesDataFour: relationalStore.ValuesBucket = {
            'THEME_ID': 4,
            'THEME_NAME': 'toppings',
            'DISPLAY_NAME': '加料',
            'THEME_TYPE': 'system',
            'REQUIRED': 0,
            'MULTI_SELECT': 1,
            'SORT_ORDER': 4
        };
        const valueBuckets = [specificationThemesDataOne, specificationThemesDataTwo, specificationThemesDataThree, specificationThemesDataFour];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库初始化失败');
            return;
        }
        try {
            const insertNum = await DatabaseService.objectiveRDB?.batchInsert('SPECIFICATION_THEMES', valueBuckets);
            hilog.info(0x0000, TAG, `SPECIFICATION_THEMES 表数据插入成功，插入数据行数：${insertNum}`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `SPECIFICATION_THEMES 表数据插入失败: ${err.code} - ${err.message}`);
        }
    }
    // 预设选项表CREATE_SPECIFICATION_OPTIONS
    async initSpecificationOptionsTable(): Promise<void> {
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return;
        }
        const count = await DatabaseService.getSpecificationOptionsCount();
        if (count > 0) {
            hilog.info(0x0000, TAG, 'SPECIFICATION_OPTIONS表已有数据，跳过初始化');
            return;
        }
        const specificationOptionsDataOne: relationalStore.ValuesBucket = {
            'OPTION_ID': 1,
            'THEME_ID': 1,
            'FOOD_ID': 0,
            'OPTION_NAME': 'medium',
            'DISPLAY_NAME': '中杯',
            'EXTRA_PRICE': 0,
            'IS_DEFAULT': 1,
            'SORT_ORDER': 1
        };
        const specificationOptionsDataTwo: relationalStore.ValuesBucket = {
            'OPTION_ID': 2,
            'THEME_ID': 1,
            'FOOD_ID': 0,
            'OPTION_NAME': 'large',
            'DISPLAY_NAME': '大杯',
            'EXTRA_PRICE': 3,
            'IS_DEFAULT': 0,
            'SORT_ORDER': 2
        };
        const specificationOptionsDataThree: relationalStore.ValuesBucket = {
            'OPTION_ID': 3,
            'THEME_ID': 2,
            'FOOD_ID': 0,
            'OPTION_NAME': 'less_ice',
            'DISPLAY_NAME': '少冰',
            'EXTRA_PRICE': 0,
            'IS_DEFAULT': 0,
            'SORT_ORDER': 1
        };
        const specificationOptionsDataFour: relationalStore.ValuesBucket = {
            'OPTION_ID': 4,
            'THEME_ID': 2,
            'FOOD_ID': 0,
            'OPTION_NAME': 'no_ice',
            'DISPLAY_NAME': '去冰',
            'EXTRA_PRICE': 0,
            'IS_DEFAULT': 0,
            'SORT_ORDER': 2
        };
        const valueBuckets = [specificationOptionsDataOne, specificationOptionsDataTwo, specificationOptionsDataThree, specificationOptionsDataFour];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库初始化失败');
            return;
        }
        try {
            const insertNum = await DatabaseService.objectiveRDB?.batchInsert('SPECIFICATION_OPTIONS', valueBuckets);
            hilog.info(0x0000, TAG, `SPECIFICATION_OPTIONS 表数据插入成功，插入数据行数：${insertNum}`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `SPECIFICATION_OPTIONS 表数据插入失败: ${err.code} - ${err.message}`);
        }
    }
    /***
     * 查询数据计数
     */
    private static async getFoodInfoCount(): Promise<number> {
        if (!DatabaseService.objectiveRDB)
            return 0;
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql('SELECT COUNT(*) as count FROM FOOD_INFO');
            if (resultSet.goToFirstRow()) {
                hilog.info(0x0000, TAG, `食物数据条数：${resultSet.getDouble(resultSet.getColumnIndex('count'))}`);
                return resultSet.getDouble(resultSet.getColumnIndex('count'));
            }
            return 0;
        }
        catch (err) {
            hilog.error(0x0000, TAG, '查询FOOD_INFO表计数失败');
            return 0;
        }
    }
    private static async getSpecificationThemesCount(): Promise<number> {
        if (!DatabaseService.objectiveRDB)
            return 0;
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql('SELECT COUNT(*) as count FROM SPECIFICATION_THEMES');
            if (resultSet.goToFirstRow()) {
                hilog.info(0x0000, TAG, `预设主题数据条数：${resultSet.getDouble(resultSet.getColumnIndex('count'))}`);
                return resultSet.getDouble(resultSet.getColumnIndex('count'));
            }
            return 0;
        }
        catch (err) {
            hilog.error(0x0000, TAG, '查询SPECIFICATION_THEMES表计数失败');
            return 0;
        }
    }
    private static async getSpecificationOptionsCount(): Promise<number> {
        if (!DatabaseService.objectiveRDB)
            return 0;
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql('SELECT COUNT(*) as count FROM SPECIFICATION_OPTIONS');
            if (resultSet.goToFirstRow()) {
                hilog.info(0x0000, TAG, `预设选项数据条数：${resultSet.getDouble(resultSet.getColumnIndex('count'))}`);
                return resultSet.getDouble(resultSet.getColumnIndex('count'));
            }
            return 0;
        }
        catch (err) {
            hilog.error(0x0000, TAG, '查询SPECIFICATION_OPTIONS表计数失败');
            return 0;
        }
    }
    private static async getFoodCategoryCount(): Promise<number> {
        if (!DatabaseService.objectiveRDB)
            return 0;
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql('SELECT COUNT(*) as count FROM FOOD_CATEGORY');
            if (resultSet.goToFirstRow()) {
                hilog.info(0x0000, TAG, `分类数据条数：${resultSet.getDouble(resultSet.getColumnIndex('count'))}`);
                return resultSet.getDouble(resultSet.getColumnIndex('count'));
            }
            return 0;
        }
        catch (err) {
            hilog.error(0x0000, TAG, '查询FOOD_CATEGORY表计数失败');
            return 0;
        }
    }
    /***
     * 查询
     */
    async queryAllPlans(): Promise<GoalItem[]> {
        let foodsSet: GoalItem[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return foodsSet;
        }
        try {
            hilog.info(0x0000, TAG, '执行JOIN查询: ' + SqlConstants.QUERY_ALL_FOOD_INFO_SQL);
            const resultSet = await DatabaseService.objectiveRDB.querySql(SqlConstants.QUERY_ALL_FOOD_INFO_SQL);
            hilog.info(0x0000, TAG, `JOIN查询得到 ${resultSet.rowCount} 行数据`);
            while (resultSet.goToNextRow()) {
                const id = resultSet.getDouble(resultSet.getColumnIndex('ID'));
                const title = resultSet.getString(resultSet.getColumnIndex('TITLE'));
                const sales = resultSet.getLong(resultSet.getColumnIndex('SALES'));
                const category = resultSet.getString(resultSet.getColumnIndex('CATEGORY'));
                const price = resultSet.getDouble(resultSet.getColumnIndex('PRICE'));
                const pic = resultSet.getString(resultSet.getColumnIndex('PIC'));
                const label = resultSet.getString(resultSet.getColumnIndex('LABEL'));
                hilog.info(0x0000, TAG, `查询到食品: ${title}, 分类: ${category}`);
                foodsSet.push(new GoalItem(id, title, sales, category, price, pic, label));
            }
            resultSet.close();
            hilog.info(0x0000, TAG, `查询到 ${foodsSet.length} 条食品数据`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `查询失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return foodsSet;
    }
    // 查询所有分类
    async queryAllCategories(): Promise<string[]> {
        let categories: string[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return categories;
        }
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql('SELECT CATEGORY FROM FOOD_CATEGORY ORDER BY ID');
            while (resultSet.goToNextRow()) {
                const category = resultSet.getString(resultSet.getColumnIndex('CATEGORY'));
                categories.push(category);
            }
            resultSet.close();
            hilog.info(0x0000, TAG, `查询到 ${categories.length} 个分类`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `查询分类失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return categories;
    }
    // 在 DatabaseService 类中添加
    async queryAllCategoriesWithId(): Promise<Category[]> {
        let categories: Category[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, '数据库未初始化');
            return categories;
        }
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql('SELECT ID, CATEGORY FROM FOOD_CATEGORY ORDER BY ID');
            while (resultSet.goToNextRow()) {
                const id = resultSet.getDouble(resultSet.getColumnIndex('ID'));
                const categoryName = resultSet.getString(resultSet.getColumnIndex('CATEGORY'));
                categories.push({ id: id, category: categoryName });
            }
            resultSet.close();
            hilog.info(0x0000, TAG, `查询到 ${categories.length} 个分类（含ID）`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `查询分类失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return categories;
    }
    // 查询系统预设或用户自定义主题
    async querySystemOrCustomThemes(sqlString: string): Promise<SpecificationTheme[]> {
        const themes: SpecificationTheme[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, 'DatabaseService', '数据库未初始化');
            return themes;
        }
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql(sqlString);
            while (resultSet.goToNextRow()) {
                const theme: SpecificationTheme = {
                    themeId: resultSet.getLong(resultSet.getColumnIndex('theme_id')),
                    themeName: resultSet.getString(resultSet.getColumnIndex('theme_name')),
                    displayName: resultSet.getString(resultSet.getColumnIndex('display_name')),
                    themeType: resultSet.getString(resultSet.getColumnIndex('theme_type')) as 'system' | 'custom',
                    required: resultSet.getLong(resultSet.getColumnIndex('required')) === 1,
                    multiSelect: resultSet.getLong(resultSet.getColumnIndex('multi_select')) === 1,
                    sortOrder: resultSet.getLong(resultSet.getColumnIndex('sort_order'))
                };
                // 查询该主题的选项
                theme.options = await this.queryOptionsByTheme(theme.themeId);
                themes.push(theme);
            }
            resultSet.close();
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `查询分类失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return themes;
    }
    // 查询主题的所有选项
    async queryOptionsByTheme(themeId: number): Promise<SpecificationOption[]> {
        const options: SpecificationOption[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, 'DatabaseService', '数据库未初始化');
            return options;
        }
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql(SqlConstants.QUERY_OPTIONS_BY_THEME_SQL, [themeId]);
            while (resultSet.goToNextRow()) {
                const option: SpecificationOption = {
                    optionId: resultSet.getLong(resultSet.getColumnIndex('OPTION_ID')),
                    themeId: resultSet.getLong(resultSet.getColumnIndex('THEME_ID')),
                    foodId: resultSet.getLong(resultSet.getColumnIndex('FOOD_ID')),
                    optionName: resultSet.getString(resultSet.getColumnIndex('OPTION_NAME')),
                    displayName: resultSet.getString(resultSet.getColumnIndex('DISPLAY_NAME')),
                    extraPrice: resultSet.getDouble(resultSet.getColumnIndex('EXTRA_PRICE')),
                    isDefault: resultSet.getLong(resultSet.getColumnIndex('IS_DEFAULT')) === 1,
                    sortOrder: resultSet.getLong(resultSet.getColumnIndex('SORT_ORDER'))
                };
                options.push(option);
            }
            resultSet.close();
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, 'DatabaseService', `查询主题选项失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return options;
    }
    // 查询商品的所有规格主题
    async queryThemesByFood(foodId: number): Promise<SpecificationTheme[]> {
        const themes: SpecificationTheme[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, 'DatabaseService', '数据库未初始化');
            return themes;
        }
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql(SqlConstants.QUERY_THEMES_BY_FOOD_SQL, [foodId]);
            while (resultSet.goToNextRow()) {
                const theme: SpecificationTheme = {
                    themeId: resultSet.getLong(resultSet.getColumnIndex('theme_id')),
                    themeName: resultSet.getString(resultSet.getColumnIndex('theme_name')),
                    displayName: resultSet.getString(resultSet.getColumnIndex('display_name')),
                    themeType: resultSet.getString(resultSet.getColumnIndex('theme_type')) as 'system' | 'custom',
                    required: resultSet.getLong(resultSet.getColumnIndex('required')) === 1,
                    multiSelect: resultSet.getLong(resultSet.getColumnIndex('multi_select')) === 1,
                    sortOrder: resultSet.getLong(resultSet.getColumnIndex('sort_order'))
                };
                // 查询该主题的所有选项
                theme.options = await this.queryOptionsByFoodAndTheme(foodId, theme.themeId);
                themes.push(theme);
            }
            resultSet.close();
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, 'DatabaseService', `查询商品规格主题失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return themes;
    }
    // 查询主题下的选项
    async queryOptionsByFoodAndTheme(foodId: number, themeId: number): Promise<SpecificationOption[]> {
        const options: SpecificationOption[] = [];
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, 'DatabaseService', '数据库未初始化');
            return options;
        }
        try {
            const resultSet = await DatabaseService.objectiveRDB.querySql(SqlConstants.QUERY_OPTIONS_BY_FOOD_AND_THEME_SQL, [themeId, foodId]);
            while (resultSet.goToNextRow()) {
                const option: SpecificationOption = {
                    optionId: resultSet.getLong(resultSet.getColumnIndex('OPTION_ID')),
                    themeId: resultSet.getLong(resultSet.getColumnIndex('THEME_ID')),
                    foodId: resultSet.getLong(resultSet.getColumnIndex('FOOD_ID')),
                    optionName: resultSet.getString(resultSet.getColumnIndex('OPTION_NAME')),
                    displayName: resultSet.getString(resultSet.getColumnIndex('DISPLAY_NAME')),
                    extraPrice: resultSet.getDouble(resultSet.getColumnIndex('EXTRA_PRICE')),
                    isDefault: resultSet.getLong(resultSet.getColumnIndex('IS_DEFAULT')) === 1,
                    sortOrder: resultSet.getLong(resultSet.getColumnIndex('SORT_ORDER'))
                };
                options.push(option);
            }
            resultSet.close();
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, 'DatabaseService', `查询主题选项失败: ${businessErr.code} - ${businessErr.message}`);
        }
        return options;
    }
    /***
     * 插入
     */
    // 添加插入食品的方法
    async insertFood(foodData: relationalStore.ValuesBucket): Promise<number> {
        if (!DatabaseService.objectiveRDB) {
            throw new Error('数据库未初始化');
        }
        try {
            const rowId = await DatabaseService.objectiveRDB.insert('FOOD_INFO', foodData);
            hilog.info(0x0000, TAG, `插入食品成功，行ID: ${rowId}`);
            return rowId;
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `插入食品失败: ${businessErr.code} - ${businessErr.message}`);
            return -1;
        }
    }
    // 通用插入方法
    async commonInsert(tableName: string, commonData: relationalStore.ValuesBucket): Promise<number> {
        if (!DatabaseService.objectiveRDB) {
            throw new Error('数据库未初始化');
        }
        try {
            const rowId = await DatabaseService.objectiveRDB.insert(tableName, commonData);
            hilog.info(0x0000, TAG, `插入${tableName} 成功，行ID: ${rowId}`);
            EventManager.getInstance().emit(`${tableName} 新增数据`);
            return rowId;
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `插入${tableName}失败: ${businessErr.code} - ${businessErr.message}`);
            return -1;
        }
    }
    // 插入自定义主题
    async insertCustomTheme(params: InsertSpecificationTheme): Promise<SpecificationTheme> {
        if (!DatabaseService.objectiveRDB) {
            throw new Error('数据库未初始化');
        }
        try {
            // 新增时默认放在最大序号位
            const maxSortResult = await DatabaseService.objectiveRDB.querySql('SELECT MAX(sort_order) as max_sort FROM SPECIFICATION_THEMES WHERE theme_type = ?', [params.themeType]);
            let nextSortOrder = 0;
            if (maxSortResult.goToNextRow()) {
                nextSortOrder = (maxSortResult.getLong(maxSortResult.getColumnIndex('max_sort')) || 0) + 1;
            }
            maxSortResult.close();
            const values = [
                params.themeName,
                params.displayName,
                params.themeType,
                params.required ? 1 : 0,
                params.multiSelect ? 1 : 0,
                nextSortOrder
            ];
            const result = await DatabaseService.objectiveRDB.executeSql(SqlConstants.INSERT_SPECIFICATION_THEME_SQL, values);
            const insertIdResult = await DatabaseService.objectiveRDB.querySql('SELECT last_insert_rowid() as id');
            let themeId = 0;
            if (insertIdResult.goToNextRow()) {
                themeId = insertIdResult.getLong(insertIdResult.getColumnIndex('id'));
            }
            insertIdResult.close();
            // 插入判断 todo 可以新增判断，获取插入前后的最大排序序号差值是否为1，不是则抛出异常
            return {
                themeId: themeId,
                themeName: params.themeName,
                displayName: params.displayName,
                themeType: params.themeType,
                required: params.required,
                multiSelect: params.multiSelect,
                sortOrder: nextSortOrder,
                options: [] // 新主题没有选项
            };
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `插入失败: ${businessErr.code} - ${businessErr.message}`);
            return {
                themeId: 0,
                themeName: '',
                displayName: '',
                themeType: 'system',
                required: false,
                multiSelect: params.multiSelect,
                sortOrder: 0,
                options: []
            }; // 新主题没有选项
        }
    }
    // 插入规格选项
    async insertCustomOption(params: InsertSpecificationOption): Promise<SpecificationOption> {
        if (!DatabaseService.objectiveRDB) {
            throw new Error('数据库未初始化');
        }
        try {
            // 新增放在最后
            const maxSortResult = await DatabaseService.objectiveRDB?.querySql('SELECT MAX(sort_order) as max_sort FROM SPECIFICATION_OPTIONS WHERE theme_id = ? AND food_id = ?', [params.themeId, params.foodId || 0]);
            let nextSortOrder = 1;
            if (maxSortResult.goToNextRow()) {
                nextSortOrder = (maxSortResult.getLong(maxSortResult.getColumnIndex('max_sort')) || 0) + 1;
            }
            maxSortResult.close();
            const values = [
                params.themeId,
                params.foodId || 0,
                params.optionName,
                params.displayName,
                params.extraPrice,
                params.isDefault ? 1 : 0,
                nextSortOrder
            ];
            // 返回插入的选项对象
            const insertId = await DatabaseService.objectiveRDB.querySql('SELECT MAX(sort_order) as max_sort FROM SPECIFICATION_OPTIONS WHERE theme_id = ? AND food_id = ?', [params.themeId, params.foodId || 0]);
            let insertIdNum = 0;
            if (insertId.goToNextRow()) {
                insertIdNum = (maxSortResult.getLong(maxSortResult.getColumnIndex('max_sort')) || 0) + 1;
            }
            return {
                optionId: insertIdNum,
                themeId: params.themeId,
                foodId: params.foodId || 0,
                optionName: params.optionName,
                displayName: params.displayName,
                extraPrice: params.extraPrice,
                isDefault: params.isDefault,
                sortOrder: nextSortOrder
            };
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, 'DatabaseService', `插入规格选项失败: ${businessErr.code} - ${businessErr.message}`);
            return {
                optionId: 0,
                themeId: 0,
                foodId: 0,
                optionName: '',
                displayName: '',
                extraPrice: -1,
                isDefault: false,
                sortOrder: -1
            };
        }
    }
    // 插入商品规格关联
    async insertFoodSpecification(params: InsertFoodSpecification): Promise<void> {
        if (!DatabaseService.objectiveRDB) {
            throw new Error('数据库未初始化');
        }
        try {
            const values = [
                params.foodId,
                params.themeId,
                params.required ? 1 : 0
            ];
            const insertId = await DatabaseService.objectiveRDB.executeSql(SqlConstants.INSERT_FOOD_SPECIFICATION_SQL, values);
            hilog.info(0x0000, TAG, `insertFoodSpecification插入成功，插入id：${insertId}`);
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, 'DatabaseService', `insertFoodSpecification插入商品规格关联失败: ${businessErr.code} - ${businessErr.message}`);
        }
    }
    /***
     * 删除
     */
    // 删除食品
    async deleteFood(foodID: number): Promise<boolean> {
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, "deletePlan Database instance is null.");
            return false;
        }
        try {
            let predicates = new relationalStore.RdbPredicates('FOOD_INFO'); // 指定操作的表名
            predicates.equalTo('ID', foodID); // 设置条件，相当于where id = foodID（入参）
            const rows = await DatabaseService.objectiveRDB.delete(predicates);
            hilog.info(0x0000, TAG, `Delete rows: ${rows}`);
            // 删除成功后发出事件
            EventManager.getInstance().emit('DataChanged');
            return true;
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `删除失败，错误码: ${businessErr.code}, 信息: ${businessErr.message}`);
            return false;
        }
    }
    // 通用删除
    async commonDelete(pkID: number, tableName: string): Promise<boolean> {
        if (!DatabaseService.objectiveRDB) {
            hilog.error(0x0000, TAG, "delete Database instance is null.");
            return false;
        }
        try {
            let predicates = new relationalStore.RdbPredicates(tableName); // 指定操作的表名
            predicates.equalTo('ID', pkID); // 设置条件，相当于where id = foodID（入参）
            const rows = await DatabaseService.objectiveRDB.delete(predicates);
            hilog.info(0x0000, TAG, `Delete rows: ${rows}`);
            // 删除成功后发出事件
            EventManager.getInstance().emit(`${tableName} 数据被删除`);
            return true;
        }
        catch (err) {
            const businessErr = err as BusinessError;
            hilog.error(0x0000, TAG, `删除失败，错误码: ${businessErr.code}, 信息: ${businessErr.message}`);
            return false;
        }
    }
}
export default DatabaseService.getInstance();
