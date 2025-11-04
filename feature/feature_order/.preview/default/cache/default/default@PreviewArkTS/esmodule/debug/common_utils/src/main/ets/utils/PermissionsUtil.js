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
import abilityAccessCtrl from '@ohos:abilityAccessCtrl';
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
import bundleManager from '@ohos:bundle.bundleManager';
import { Logger } from '@bundle:com.atomicservice.5765880207855620561/feature_order@common_utils/ets/utils/Logger';
export class PermissionsUtil {
    /**
     * 校验应用是否被授予定位权限
     * @param permissions
     * @returns
     */
    async checkPermissions(permissions) {
        let applyResult = false;
        for (let permission of permissions) {
            let grantStatus = await this.checkAccessToken(permission);
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
    async checkAccessToken(permission) {
        let atManager = abilityAccessCtrl.createAtManager();
        let grantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;
        // 获取应用程序的accessTokenID
        let tokenId = 0;
        try {
            let bundleInfo = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
            let appInfo = bundleInfo.appInfo;
            tokenId = appInfo.accessTokenId;
        }
        catch (error) {
            let err = error;
            Logger.error(`Failed to get bundle info for self. Code is ${err.code}, message is ${err.message}`);
        }
        // 校验应用是否被授予权限
        try {
            grantStatus = await atManager.checkAccessToken(tokenId, permission);
        }
        catch (error) {
            let err = error;
            Logger.error(`Failed to check access token. Code is ${err.code}, message is ${err.message}`);
        }
        return grantStatus;
    }
    /**
     * 申请用户授权
     * @param permissions
     */
    requestPermissions(permissions) {
        let atManager = abilityAccessCtrl.createAtManager();
        atManager.requestPermissionsFromUser(getContext(), permissions)
            .then((data) => {
            Logger.info('request Permissions success');
        })
            .catch((err) => {
            Logger.error(`Failed to request permissions from user. Code is ${err.code}, message is ${err.message}`);
        });
    }
}
//# sourceMappingURL=PermissionsUtil.js.map