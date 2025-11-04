import abilityAccessCtrl from '@ohos:abilityAccessCtrl';
import bundleManager from '@ohos:bundle.bundleManager';
import hilog from '@ohos:hilog';
const TAG = 'PermissionsUtil';
export class PermissionsUtil {
    // 检查一组权限是否授权，如果其中任何一个权限未被授权，则会触发权限申请
    async checkPermissions(permissions) {
        let applyResult = false;
        // 异步循环逐个检查权限
        for (let permission of permissions) {
            let grantStatus = await this.checkAccessToken(permission);
            // 一旦发现没有授权的权限就去申请
            if (grantStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                // 传入权限组，全部申请
                // 为什么没有callback参数传递？
                // 表示只请求选线，但是不关心请求结果
                await this.requestPermission(permissions); // 要什么权限
                return;
            }
        }
    }
    // 检查是否授予指定权限
    // 方法通过访问令牌管理器来验证权限状态
    async checkAccessToken(permission) {
        // 创建访问令牌管理器实例
        // 这是与系统权限服务交互的主要接口
        let atManager = abilityAccessCtrl.createAtManager();
        // 初始化权限状态为默认拒绝状态
        let grantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;
        // 获取应用程序的accessTokenID
        let tokenId = 0;
        try {
            // 尝试获取当前应用程序的包信息，特别请求包含应用信息
            // 从应用信息中提取访问令牌ID：accessTokenId
            let bundleInfo = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
            let appInfo = bundleInfo.appInfo;
            tokenId = appInfo.accessTokenId;
        }
        catch (error) {
            let err = error;
            hilog.error(0x0000, TAG, `Failed to get bundle info for self. Code is ${err.code}, message is ${err.message}`);
        }
        // 检查权限是否授予
        try {
            // 使用访问令牌管理器检查指定权限的授予状态
            grantStatus = await atManager.checkAccessToken(tokenId, permission);
        }
        catch (error) {
            let err = error;
            hilog.error(0x0000, TAG, `Failed to get bundle info for self. Code is ${err.code}, message is ${err.message}`);
        }
        return grantStatus;
    }
    // requestPermission函数只关心：如何请求权限，何时调用回调
    async requestPermission(permissions, callback) {
        let atManager = abilityAccessCtrl.createAtManager();
        // 调用requestPermissionsFromUser方法向用户请求权限
        // getContext() as common.UIAbilityContext : 获取当前UIAbility的上下文并转换为合适的类型,这是显示权限请求对话框所必需的
        // permission: 需要请求的权限数组
        // 这个方法会显示系统原生的权限请求对话框
        atManager.requestPermissionsFromUser(getContext(), permissions) // 如何请求权限
            // 处理请求结果
            .then((data) => {
            hilog.info(0x0000, TAG, '请求成功');
            hilog.info(0x0000, TAG, `Requested permissions: ${permissions.join(', ')}`);
            if (callback) { // 何时调用回调
                callback(data);
            }
        })
            .catch((err) => {
            hilog.error(0x0000, TAG, `Failed to request permissions from user. Code is ${err.code}, message is ${err.message}`);
            if (callback) {
                callback({ permissions: [], authResults: [] }); // 返回空结果表示失败
            }
        });
    }
}
function processData(data, callback) {
    if (typeof data === 'string') {
        callback(data.toUpperCase());
    }
    else {
        callback(data, data * data);
    }
}
// 根据参数类型自动选择正确的重载
processData("hello", (result) => { }); // ✅ 使用第一个重载
processData(5, (result, squared) => { }); // ✅ 使用第二个重载// 为同一个函数提供多种调用签名
//# sourceMappingURL=PermissionsUtil.js.map