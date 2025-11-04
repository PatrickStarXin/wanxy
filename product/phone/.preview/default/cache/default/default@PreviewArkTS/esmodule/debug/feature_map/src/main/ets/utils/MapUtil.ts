import map from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map";
import mapCommon from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon";
export class MapUtil {
    public static convertToGcj02(latitude: number, longitude: number) {
        let wgs84Position: mapCommon.LatLng = {
            latitude: latitude,
            longitude: longitude
        };
        // 转换经纬度坐标
        let gcj02Position: mapCommon.LatLng = map.convertCoordinateSync(mapCommon.CoordinateType.WGS84, mapCommon.CoordinateType.GCJ02, wgs84Position);
        return gcj02Position;
    }
}
