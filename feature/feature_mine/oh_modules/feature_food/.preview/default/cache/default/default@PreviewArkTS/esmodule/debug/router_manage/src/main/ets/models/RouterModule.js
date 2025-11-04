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
import { AnimatedMap } from '@bundle:com.atomicservice.6917586311984927931/feature_food@router_manage/ets/commons/AnimateMap';
export class RouterModule {
    // 注册路由栈，存入stackMap
    static createStack(name, stack) {
        RouterModule.stackMap.set(name, stack);
    }
    // 获取指定栈名的路由栈
    static getStack(name) {
        return RouterModule.stackMap.get(name);
    }
    // 跳转到指定路由栈的指定路由页面
    static push(info) {
        const stack = RouterModule.getStack(info.stackName);
        if (stack) {
            stack.pushPathByName(info.url, info.param, info.animateSwitch === AnimatedMap.ON);
        }
        else {
            console.error('push nav failed, stackName:' + info.stackName + ', url:' + info.url);
        }
    }
    // 将指定路由栈的栈顶页面退出，将info指定的NavDestination页面信息入栈
    static replace(info) {
        const stack = RouterModule.getStack(info.stackName);
        if (stack) {
            stack.replacePathByName(info.url, info.param, info.animateSwitch === AnimatedMap.ON);
        }
        else {
            console.error('replace nav failed, stackName:' + info.stackName + ', url:' + info.url);
        }
    }
    // 弹出栈顶元素
    static pop(stackName, animated) {
        RouterModule.getStack(stackName)?.pop(animated);
    }
    // 回退路由栈到由栈底开始第一个名为name的NavDestination页面
    static popToName(stackName, url, animated) {
        RouterModule.getStack(stackName)?.popToName(url, animated);
    }
    // 清除指定栈中的所有页面
    static clear(stackName, animated) {
        RouterModule.getStack(stackName)?.clear(animated);
    }
    // 获取指定栈中指定页面的参数
    static getNavParam(info) {
        const stack = RouterModule.getStack(info.stackName);
        if (stack) {
            return stack.getParamByName(info.url);
        }
        console.info('stack does not exist');
        return [];
    }
}
RouterModule.stackMap = new Map();
//# sourceMappingURL=RouterModule.js.map