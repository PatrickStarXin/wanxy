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

import { AnimatedMap } from '../commons/AnimateMap';
import { NavRouterMap } from '../commons/NavRouterMap';

export default interface NavRouterInfo {
  stackName: string, // 路由栈名称
  url: NavRouterMap, // 需要跳转的路由名
  mode?: NavDestinationMode, // NavDestination类型
  param?: Object, // 跳转传参
  animateSwitch?: AnimatedMap, // 跳转动画
}

