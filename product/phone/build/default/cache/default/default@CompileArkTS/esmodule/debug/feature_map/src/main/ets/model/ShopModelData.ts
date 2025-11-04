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
export class ShopDetail {
    id: string;
    name: string;
    addr: string;
    // 元服务没法地理编码，所以需要提前准备坐标
    latitude: number;
    longitude: number;
    time: string;
    status: string;
    phone?: string;
}
export const ShopDetailList: ShopDetail[] = [
    {
        "id": "1",
        "name": "眉山东坡区",
        "addr": "四川省眉山市东坡区",
        "latitude": 30.41179865921862,
        "longitude": 103.5595712767688,
        "time": "08:00-22:30",
        "status": "正在营业",
        "phone": "13988888888"
    },
    {
        "id": "2",
        "name": "内江东兴区",
        "addr": "四川省内江市东兴区",
        "latitude": 31.981216623368418,
        "longitude": 118.75703124790246,
        "time": "10:00-22:30",
        "status": "正在营业",
        "phone": "13988888888"
    },
    {
        "id": "3",
        "name": "南京虹悦城店",
        "addr": "江苏省南京市雨花台区应天大街619号南京虹悦城",
        "latitude": 32.011200618734215,
        "longitude": 118.76058840843832,
        "time": "10:00-22:30",
        "status": "打烊了",
        "phone": "13988888888"
    },
    {
        "id": "4",
        "name": "南京德基店",
        "addr": "江苏省南京市玄武区德基广场",
        "latitude": 32.04562532875168,
        "longitude": 118.78026294013853,
        "time": "10:00-22:30",
        "status": "打烊了",
        "phone": "13988888888"
    }
];
export function getShopByName(shopName: string): ShopDetail {
    for (let i = 0; i < ShopDetailList.length; i++) {
        if (ShopDetailList[i].name === shopName) {
            return ShopDetailList[i];
        }
    }
    return undefined;
}
