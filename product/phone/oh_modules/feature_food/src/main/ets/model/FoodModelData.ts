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

export class FoodDetail {
  id : string;
  title: string;
  desc: string;
  price: number;
  pic: string;
  label?: string;   //备注
  buyNum: number;
  category: string;  //分类
}

export class FoodList {
  category: string;
  list: FoodDetail[]
}

export const FoodCategoryListData1: string[] = [
  '粉丝福利', '多人套餐', '田园时蔬', '单人套餐', '招牌必点', '小份尝鲜', '湘味小炒', '主食小吃'
];

export const FoodCategoryListData2: string[] = [
  '时令上新', '热饮推荐', '清爽果茶', '醇香奶茶', '主食小吃'
];

export function getCategoryListByShop(chooseShop: string) : string[] {
  return chooseShop === "南京雨花客厅店" ? FoodCategoryListData1 : FoodCategoryListData2
}

/*
export function getFoodListByShop(chooseShop: string) : FoodList[] {
  return chooseShop === "南京雨花客厅店" ? FoodListData1 : FoodListData2
}*/
