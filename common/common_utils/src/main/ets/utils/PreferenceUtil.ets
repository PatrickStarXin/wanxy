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

import { promptAction } from '@kit.ArkUI';
import { preferences } from '@kit.ArkData';
import CommonConstants from '../constants/CommonConstants';
import { Context } from '@kit.AbilityKit';


/**
 * Preference model.
 *
 * @param fruitData Fruit data.
 */
export class PreferenceUtil {

  public static getPreference(context: Context, name: string) {
    let options: preferences.Options = { name: name };
    let dataPreferences: preferences.Preferences | null = preferences.getPreferencesSync(context, options);
    return dataPreferences
  }

  /**
   * Popup window prompt message.
   *
   * @param message Prompt message.
   */
  public static showToastMessage(message: string) {
    promptAction.showToast({
      message: message,
      duration: CommonConstants.DURATION
    });
  };
}

