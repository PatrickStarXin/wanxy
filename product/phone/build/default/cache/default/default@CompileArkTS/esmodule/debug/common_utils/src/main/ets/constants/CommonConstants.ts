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
/**
 * Common constants for all features.
 */
class CommonConstants {
    /**
     * Duration of prompt.
     */
    DURATION: number = 3000;
    /**
     * The tag is used to print log.
     */
    TAG = '[PreferenceModel]';
    /**
     * The key value of the data store.
     */
    KEY_NAME = 'food';
    /**
     * The name of the data store.
     * 文件名，不是数据库名，可以是任何名字
     */
    PREFERENCES_NAME = 'food.db';
}
export default new CommonConstants();
