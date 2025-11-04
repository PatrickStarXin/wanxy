
export default class SqlConstants {
  /***
   * food
   */
  // 创建菜单信息表
  static readonly CREATE_FOOD_INFO_TABLE_SQL : string =
    'CREATE TABLE IF NOT EXISTS FOOD_INFO (ID INTEGER PRIMARY KEY AUTOINCREMENT, TITLE TEXT NOT NULL, SALES INTEGER, PRICE REAL, PIC BLOB, LABEL TEXT,TYPE INTEGER)';

  // 创建菜品种类表
  static readonly CREATE_FOOD_CATEGORY_TABLE_SQL : string =
    'CREATE TABLE IF NOT EXISTS FOOD_CATEGORY (ID INTEGER PRIMARY KEY AUTOINCREMENT, CATEGORY TEXT NOT NULL)';

  // 查询所有菜单数据
  static readonly QUERY_ALL_FOOD_INFO_SQL: string =
    'SELECT A.ID, A.TITLE, A.SALES, B.CATEGORY, A.PRICE, A.PIC, A.LABEL ' +
      'FROM FOOD_INFO A ' +
      'INNER JOIN FOOD_CATEGORY B ON A.TYPE = B.ID ' +// 明确指定JOIN条件
      'ORDER BY SALES';

  /***
   * order
   */
  // 创建订单表
  static readonly CREATE_ORDER_INFO_TABLE_SQL: string =
    'CREATE TABLE IF NOT EXISTS ORDER_INFO (' +
      'ID INTEGER PRIMARY KEY AUTOINCREMENT,' +     //主键
      'ORDER_NO TEXT NOT NULL, ' +     // 订单号，一起下单，生成同一个订单号
      'FOOD_ID INTEGER NOT NULL, ' +      // 食物ID，关联食物信息表查询，避免数据冗余，一起下单分开存储，用订单号关联
      'ORDER_QUANTITY INTEGER,' +        // 每个食物下单的数量
      'ORDER_TIME INTEGER,' +        // 下单时间
      'STORE_NAME STRING )';       // 店铺名称

  /***
   * 自定义搭配数据存储表
   */
  // 规格主题表（系统预设 + 商家自定义）
  static readonly CREATE_SPECIFICATION_THEMES: string =
    'CREATE TABLE SPECIFICATION_THEMES (' +
      ' THEME_ID INTEGER PRIMARY KEY AUTOINCREMENT,' +
      '  THEME_NAME TEXT NOT NULL,' +           // 主题名称：规格、温度、甜度等
      '  DISPLAY_NAME TEXT NOT NULL, ' +          // 显示名称
      '  THEME_TYPE TEXT, ' +         // 类型：SYSTEM(系统预设) / CUSTOM(商家自定义)
      '  REQUIRED INTEGER DEFAULT 0,' +            // 是否必选：0否 1是
      '  MULTI_SELECT INTEGER DEFAULT 0,' +        // 是否多选：0否 1是
      '  SORT_ORDER INTEGER DEFAULT 0)';

  // 规格选项表
  static readonly CREATE_SPECIFICATION_OPTIONS: string =
    'CREATE TABLE SPECIFICATION_OPTIONS (' +
      '  OPTION_ID INTEGER PRIMARY KEY AUTOINCREMENT,' +
      '  THEME_ID INTEGER,' +
      '  FOOD_ID INTEGER,' +                    // 关联商品，为0表示全局选项
      '  OPTION_NAME TEXT NOT NULL,' +          // 选项名称：中杯、大杯等
      '  DISPLAY_NAME TEXT NOT NULL,' +         // 显示名称
      '  EXTRA_PRICE REAL DEFAULT 0,' +         // 额外价格
      '  IS_DEFAULT INTEGER DEFAULT 0,' +     // 是否默认选项
      '  SORT_ORDER INTEGER DEFAULT 0' +
      ')';

  // 商品规格关联表
  static readonly CREATE_FOOD_SPECIFICATIONS: string =
    'CREATE TABLE FOOD_SPECIFICATIONS (' +
      '  ID INTEGER PRIMARY KEY AUTOINCREMENT,' +
      '  FOOD_ID INTEGER,' +
      '  THEME_ID INTEGER,' +
      '  REQUIRED INTEGER DEFAULT 0' +
      ')';
  // 查询系统预设主题
  static readonly QUERY_SYSTEM_THEMES_SQL: string =
    `SELECT * FROM SPECIFICATION_THEMES WHERE theme_type = 'system' ORDER BY sort_order`;

  // 查询商家自定义主题
  static readonly QUERY_CUSTOM_THEMES_SQL: string =
    `SELECT * FROM SPECIFICATION_THEMES WHERE theme_type = 'custom' ORDER BY sort_order`;

  // 查询主题的所有选项
  static readonly QUERY_OPTIONS_BY_THEME_SQL: string =
    `SELECT * FROM SPECIFICATION_OPTIONS WHERE theme_id = ? ORDER BY sort_order`;

  // 插入规格主题
  static readonly INSERT_SPECIFICATION_THEME_SQL: string =
    `INSERT INTO SPECIFICATION_THEMES (theme_name, display_name, theme_type, required, multi_select, sort_order)
     VALUES (?, ?, ?, ?, ?, ?)`;

  // 插入规格选项
  static readonly INSERT_SPECIFICATION_OPTION_SQL: string =
    `INSERT INTO SPECIFICATION_OPTIONS (theme_id, food_id, option_name, display_name, extra_price, is_default, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // 插入商品规格关联
  static readonly INSERT_FOOD_SPECIFICATION_SQL: string =
    `INSERT INTO FOOD_SPECIFICATIONS (food_id, theme_id, required) VALUES (?, ?, ?)`;

  // 查询商品的所有规格主题
  static readonly QUERY_THEMES_BY_FOOD_SQL: string =
    `SELECT st.*, fs.required
     FROM SPECIFICATION_THEMES st
     INNER JOIN FOOD_SPECIFICATIONS fs ON st.theme_id = fs.theme_id
     WHERE fs.food_id = ?
     ORDER BY st.sort_order`;

  // 查询商品规格的所有选项
  static readonly QUERY_OPTIONS_BY_FOOD_AND_THEME_SQL: string =
    `SELECT so.*
     FROM SPECIFICATION_OPTIONS so
     WHERE so.theme_id = ? AND (so.food_id = 0 OR so.food_id = ?)
     ORDER BY so.sort_order`;

}



