import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import bundleManager from "@ohos:bundle.bundleManager";
import type common from "@ohos:app.ability.common";
import type { PermissionRequestResult as PermissionRequestResult } from "@ohos:abilityAccessCtrl";
import type { Permissions as Permissions } from "@ohos:abilityAccessCtrl";
import type { BusinessError as BusinessError } from "@ohos:base";
import { Logger } from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/ets/utils/Logger";
export class PermissionsUtil {
    /**
     * 校验应用是否被授予定位权限
     * @param permissions
     * @returns
     */
    async checkPermissions(permissions: Array<Permissions>): Promise<void> {
        let applyResult: boolean = false;
        for (let permission of permissions) {
            let grantStatus: abilityAccessCtrl.GrantStatus = await this.checkAccessToken(permission);
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                applyResult = true;
            }
            else {
                applyResult = false;
            }
        }
        if (!applyResult) {
            this.requestPermissions(permissions);
        }
    }
    async checkAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
        let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        let grantStatus: abilityAccessCtrl.GrantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;
        // 获取应用程序的accessTokenID
        let tokenId: number = 0;
        try {
            let bundleInfo: bundleManager.BundleInfo = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
            let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
            tokenId = appInfo.accessTokenId;
        }
        catch (error) {
            let err: BusinessError = error as BusinessError;
            Logger.error(`Failed to get bundle info for self. Code is ${err.code}, message is ${err.message}`);
        }
        // 校验应用是否被授予权限
        try {
            grantStatus = await atManager.checkAccessToken(tokenId, permission);
        }
        catch (error) {
            let err: BusinessError = error as BusinessError;
            Logger.error(`Failed to check access token. Code is ${err.code}, message is ${err.message}`);
        }
        return grantStatus;
    }
    /**
     * 申请用户授权
     * @param permissions
     */
    requestPermissions(permissions: Array<Permissions>): void {
        let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        atManager.requestPermissionsFromUser(getContext() as common.UIAbilityContext, permissions)
            .then((data: PermissionRequestResult) => {
            Logger.info('request Permissions success');
        })
            .catch((err: BusinessError) => {
            Logger.error(`Failed to request permissions from user. Code is ${err.code}, message is ${err.message}`);
        });
    }
}
