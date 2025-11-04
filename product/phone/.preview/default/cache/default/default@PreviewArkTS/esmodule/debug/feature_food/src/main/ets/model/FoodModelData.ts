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
    id: string;
    title: string;
    desc: string;
    price: number;
    pic: string;
    label?: string;
    buyNum: number;
}
export class FoodList {
    category: string;
    list: FoodDetail[];
}
export const FoodCategoryListData1: string[] = [
    '粉丝福利', '多人套餐', '田园时蔬', '单人套餐', '招牌必点', '小份尝鲜', '湘味小炒', '主食小吃'
];
export const FoodCategoryListData2: string[] = [
    '时令上新', '热饮推荐', '清爽果茶', '醇香奶茶', '主食小吃'
];
export const FoodListData1: FoodList[] = [
    {
        "category": "粉丝福利",
        "list": [
            {
                "id": "1-1",
                "title": "福利|蛋糕",
                "desc": "月售100+",
                "price": 3.88,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-2",
                "title": "福利|狼牙土豆",
                "desc": "月售200+",
                "price": 4.99,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-3",
                "title": "福利|鸡块",
                "desc": "月售100",
                "price": 9.8,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-4",
                "title": "福利|冰粉4",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-5",
                "title": "福利|冰粉5",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "多人套餐",
        "list": [
            {
                "id": "2-1",
                "title": "湖南小炒肉",
                "desc": "月售1000",
                "price": 30,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-2",
                "title": "小炒黄牛肉",
                "desc": "月售500",
                "price": 40,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-3",
                "title": "香干炒肉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-4",
                "title": "农家小炒鸡",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-5",
                "title": "外婆菜炒蛋",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "田园时蔬",
        "list": [
            {
                "id": "3-1",
                "title": "秋季上新1",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-2",
                "title": "秋季上新2",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-3",
                "title": "福利|奶茶",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "单人套餐",
        "list": [
            {
                "id": "4-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "招牌必点",
        "list": [
            {
                "id": "5-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "小份尝鲜",
        "list": [
            {
                "id": "6-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "6-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "6-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "6-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "6-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "湘味小炒",
        "list": [
            {
                "id": "7-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "7-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "7-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "7-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "7-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "主食小吃",
        "list": [
            {
                "id": "8-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "8-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "8-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "8-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "8-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_main",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
];
export const FoodListData2: FoodList[] = [
    {
        "category": "时令上新",
        "list": [
            {
                "id": "1-1",
                "title": "春茶",
                "desc": "月售100+",
                "price": 8,
                "pic": "app.media.food_1",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-2",
                "title": "夏茶",
                "desc": "月售200+",
                "price": 6,
                "pic": "app.media.food_3",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-3",
                "title": "秋茶",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_4",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "1-4",
                "title": "冬茶",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.food_5",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "热饮推荐",
        "list": [
            {
                "id": "2-1",
                "title": "珍珠奶茶",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-2",
                "title": "红豆奶茶",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-3",
                "title": "黑糖奶茶",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "2-4",
                "title": "桂花酒酿",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "清爽果茶",
        "list": [
            {
                "id": "3-1",
                "title": "葡萄多多",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-2",
                "title": "西瓜多多",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-3",
                "title": "芒果多多",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "3-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "醇香奶茶",
        "list": [
            {
                "id": "4-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "4-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    },
    {
        "category": "主食小吃",
        "list": [
            {
                "id": "5-1",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-2",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-3",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-4",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            },
            {
                "id": "5-5",
                "title": "福利|冰粉",
                "desc": "月售100",
                "price": 10,
                "pic": "app.media.tee",
                "label": "味道好极了",
                "buyNum": 0
            }
        ]
    }
];
export function getCategoryListByShop(chooseShop: string): string[] {
    return chooseShop === "南京雨花客厅店" ? FoodCategoryListData1 : FoodCategoryListData2;
}
export function getFoodListByShop(chooseShop: string): FoodList[] {
    return chooseShop === "南京雨花客厅店" ? FoodListData1 : FoodListData2;
}
