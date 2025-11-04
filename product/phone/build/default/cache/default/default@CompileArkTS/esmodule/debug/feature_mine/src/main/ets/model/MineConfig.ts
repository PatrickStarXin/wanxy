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
export class MineConfigItem {
    index: number = 0;
    img: Resource = { "id": 134217763, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
    title: string | Resource = "客服中心";
    click?: (event: ClickEvent) => void;
}
export const MineConfigs: MineConfigItem[] = [
    {
        index: 0,
        img: { "id": 134217774, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
        title: "客服中心",
    },
    {
        index: 1,
        img: { "id": 134217778, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
        title: "扫一扫",
    },
    {
        index: 2,
        img: { "id": 134217779, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
        title: "设置",
    },
    {
        index: 3,
        img: { "id": 134217773, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
        title: "意见反馈",
    },
    {
        index: 4,
        img: { "id": 134217779, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" },
        title: "退出登录",
    },
];
