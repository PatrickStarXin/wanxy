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

import { hilog } from '@kit.PerformanceAnalysisKit';

/**
 * A utility class for printing logs.
 *
 * @param prefix The prefix of Logger.
 */
export class Logger {

  private static domain: number = 0xFF00;
  private static prefix: string = "FoodDemo";
  private static format: string = '%{public}s, %{public}s';


  /**
   * Outputs debug-level logs.
   *
   * @param args Indicates the log parameters.
   */
  static debug(...args: string[]) {
    hilog.debug(Logger.domain, Logger.prefix, Logger.format, args);
  }

  /**
   * Outputs info-level logs.
   *
   * @param args Indicates the log parameters.
   */
  static info(...args: string[]) {
    hilog.info(Logger.domain, Logger.prefix, Logger.format, args);
  }

  /**
   * Outputs warning-level logs.
   *
   * @param args Indicates the log parameters.
   */
  static warn(...args: string[]) {
    hilog.warn(Logger.domain, Logger.prefix, Logger.format, args);
  }

  /**
   * Outputs error-level logs.
   *
   * @param args Indicates the log parameters.
   */
  static error(...args: string[]) {
    hilog.error(Logger.domain, Logger.prefix, Logger.format, args);
  }
}

// export default new Logger('[FoodDemo]');