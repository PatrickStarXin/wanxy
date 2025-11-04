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



import { map, mapCommon } from '@kit.MapKit';

export class MapUtil {
  public static convertToGcj02( latitude: number, longitude: number) {
    let wgs84Position: mapCommon.LatLng = {
      latitude: latitude,
      longitude: longitude
    };

    // 转换经纬度坐标
    let gcj02Position: mapCommon.LatLng =
      map.convertCoordinateSync(mapCommon.CoordinateType.WGS84, mapCommon.CoordinateType.GCJ02, wgs84Position);
    return gcj02Position
  }
}


