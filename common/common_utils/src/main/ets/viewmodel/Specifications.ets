// 新增接口定义
export interface SpecificationTheme {
  themeId: number;
  themeName: string;
  displayName: string;
  themeType: 'system' | 'custom';
  required: boolean;
  multiSelect: boolean;
  sortOrder: number;
  options?: SpecificationOption[];   // 关联的选项
}

// 规格选项接口
export interface SpecificationOption {
  optionId: number;
  themeId: number;
  foodId: number; // 0表示全局选项，>0表示特定商品的选项
  optionName: string;
  displayName: string;
  extraPrice: number;
  isDefault: boolean;
  sortOrder: number;
}


// 商品规格关联接口
export interface FoodSpecification {
  /*id: number;
  foodId: number;
  themeId: number;
  required: boolean;*/
  themeId: number;
  required: boolean;
  selectedOptions: number[]; // 选择的选项ID
}


// 插入参数接口（不需要ID）
export interface InsertSpecificationTheme {
  themeName: string;
  displayName: string;
  themeType: 'system' | 'custom';
  required: boolean;
  multiSelect: boolean;
  sortOrder?: number;
}

export interface InsertSpecificationOption {
  themeId: number;
  foodId?: number; // 可选，默认为0（全局）
  optionName: string;
  displayName: string;
  extraPrice: number;
  isDefault: boolean;
  sortOrder?: number;
}

export interface InsertFoodSpecification {
  foodId: number;
  themeId: number;
  required: number;
}
