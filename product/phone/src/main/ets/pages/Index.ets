/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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

import { NavRouterMap, RouterModule, NavStackMap } from 'router_manage'

@Entry
@Component
struct Index {
  @State mainNavStack: NavPathStack = new NavPathStack()

  aboutToAppear(): void {
    RouterModule.createStack(NavStackMap.MAIN_STACK, this.mainNavStack)
    RouterModule.replace({ stackName: NavStackMap.MAIN_STACK, url: NavRouterMap.PAGE_MAIN })
  }

  build() {
    Navigation(this.mainNavStack)
      .hideNavBar(true)
      .hideBackButton(true)
      .hideTitleBar(true)
      .hideToolBar(true)
      .height('100%')
      .width('100%')
  }
}