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
  img: Resource = $r('app.media.ic_home_header');
  title: string | Resource = "客服中心";
  click?: (event: ClickEvent) => void
}

export const MineConfigs: MineConfigItem[] = [
  {
    index: 0,
    img: $r('app.media.ic_public_people'),
    title: "客服中心",
  },
  {
    index: 1,
    img: $r('app.media.ic_public_scan'),
    title: "扫一扫",
  },
  {
    index: 2,
    img: $r('app.media.ic_public_setting'),
    title: "设置",
  },
  {
    index: 3,
    img: $r('app.media.ic_public_message'),
    title: "意见反馈",
  },
  {
    index: 4,
    img: $r('app.media.ic_public_setting'),
    title: "退出登录",
  },

]