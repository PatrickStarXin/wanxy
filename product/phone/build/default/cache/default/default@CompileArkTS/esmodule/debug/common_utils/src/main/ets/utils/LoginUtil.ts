import hilog from "@ohos:hilog";
import authentication from "@hms:core.authentication";
import type common from "@ohos:app.ability.common";
import type { BusinessError as BusinessError } from "@ohos:base";
import util from "@ohos:util";
import { PreferenceUtil } from "@normalized:N&&&common_utils/src/main/ets/utils/PreferenceUtil&1.0.0";
export interface LoginInfo {
    isLogin: boolean;
    nickName?: string;
    avatarUri?: string;
    email?: string;
    idToken?: string;
    openID?: string;
    unionID?: string;
    authCode?: string;
    error?: string;
}
export class LoginUtil {
    // 使用常量，避免硬编码
    private static readonly PREFERENCES_NAME = 'auth_preferences';
    private static readonly KEY_IS_LOGIN = 'is_login';
    private static readonly KEY_USER_NAME = 'user_name';
    private static readonly KEY_USER_AVATAR = 'user_avatar';
    private static readonly KEY_USER_EMAIL = 'user_email';
    private static readonly KEY_OPEN_ID = 'open_id';
    private static readonly KEY_LOGIN_TIME = 'login_time';
    static async login(context: common.UIAbilityContext, forceLogin: boolean = false): Promise<LoginInfo> {
        hilog.info(0x0000, 'MineComponent_login', '开始执行登录');
        // 创建授权请求，而不是登录请求
        let authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
        // 设置为true, 确保拉起授权界面，用户知情并同意
        authRequest.forceAuthorization = true;
        // 随机生成uuid防止csrf攻击,用于防跨站点请求伪造
        authRequest.state = util.generateRandomUUID();
        // 关键配置，申请获取用户档案信息的权限
        authRequest.scopes = ['profile', 'email']; // 申请获取昵称，头像等基本信息
        hilog.info(0x0000, 'AuthUtil', '设置授权参数: forceAuthorization=%{public}s, scopes=%{public}s', authRequest.forceAuthorization.toString(), JSON.stringify(authRequest.scopes));
        // 执行登录请求
        try {
            // 创建认证控制器，执行登录请求，返回promise
            let controller = new authentication.AuthenticationController(context); // 传入上下文
            hilog.info(0x0000, 'AuthUtil', '创建认证控制器成功');
            const response = await controller.executeRequest(authRequest) as authentication.AuthorizationWithHuaweiIDResponse;
            hilog.info(0x0000, 'AuthUtil', '执行授权请求成功，获取到响应');
            let authResponse = response as authentication.AuthorizationWithHuaweiIDResponse;
            let state = authResponse.state; // 验证state
            if (state != undefined && authRequest.state != state) {
                hilog.info(0x0000, 'MineComponent_login', `授权失败，状态码不一致，响应状态: ${state}`);
                return {
                    isLogin: false,
                    error: '安全验证失败'
                };
            }
            if (!response.data) {
                return {
                    isLogin: false,
                    error: '未获取到用户数据'
                };
            }
            hilog.info(0x0000, 'MineComponent_login', 'Succeeded in logging in.');
            const authorizationData = authResponse.data!;
            // 从授权响应中获取用户昵称和头像uri
            const successResult: LoginInfo = {
                isLogin: true,
                nickName: authorizationData.nickName,
                avatarUri: authorizationData.avatarUri,
                email: authorizationData.email,
                idToken: authorizationData.idToken,
                openID: authorizationData.openID,
                unionID: authorizationData.unionID,
                authCode: authorizationData.authorizationCode
            };
            return successResult;
        }
        catch (error) {
            hilog.error(0x0000, 'MineComponent_login', 'Failed to login2, errorCode=%{public}s, errorMsg=%{public}s', error.code.toString(), error.message);
            return {
                isLogin: false,
                error: '未获取到用户数据'
            };
        }
    }
    /**
     * 保存登录信息到本地
     * @param userInfo 用户信息
     */
    static async saveLoginInfo(loginInfo: LoginInfo): Promise<void> {
        // 保存到本地存储的逻辑
        // 例如使用 @ohos.data.preferences
        try {
            //let preferences = await PreferenceUtil.getPreferences(getContext() as common.UIAbilityContext, this.PREFERENCES_NAME);
            let preferences = PreferenceUtil.getPreference(getContext() as common.UIAbilityContext, LoginUtil.PREFERENCES_NAME);
            // putSync同步方法，put异步方法
            preferences.putSync(LoginUtil.KEY_IS_LOGIN, loginInfo.isLogin);
            preferences.putSync(LoginUtil.KEY_USER_NAME, loginInfo.nickName || '');
            preferences.putSync(LoginUtil.KEY_USER_AVATAR, loginInfo.avatarUri || '');
            preferences.putSync(LoginUtil.KEY_USER_EMAIL, loginInfo.email || '');
            preferences.putSync(LoginUtil.KEY_OPEN_ID, loginInfo.openID || '');
            preferences.putSync(LoginUtil.KEY_LOGIN_TIME, Date.now());
            // 同理
            // flush方法的核心作用是将内存中preferences实例数据持久化到应用的磁盘文件里，防止丢失
            // get和delete方法等数据变动方法首先会存储在实例中，崩溃重启会造成数据丢失
            // flush能立即写入持久化文件
            try {
                preferences.flushSync();
                console.info('立即持久化成功');
            }
            catch (err) {
                console.error(`立即持久化成功失败. Code:${err.code}, message:${err.message}`);
            }
            hilog.info(0x0000, 'AuthUtil', '登录信息保存成功');
        }
        catch (error) {
            hilog.error(0x0000, 'AuthUtil_saveLoginInfo', '保存登录信息失败: %{public}s', (error as BusinessError).message);
        }
    }
    static async getLoginInfo(): Promise<LoginInfo> {
        try {
            let preferences = PreferenceUtil.getPreference(getContext() as common.UIAbilityContext, LoginUtil.PREFERENCES_NAME);
            let isLogin = preferences.getSync(LoginUtil.KEY_IS_LOGIN, false) as boolean;
            let userName = preferences.getSync(LoginUtil.KEY_USER_NAME, '') as string;
            let userAvatar = preferences.getSync(LoginUtil.KEY_USER_AVATAR, '') as string;
            let userEmail = preferences.getSync(LoginUtil.KEY_USER_EMAIL, '') as string;
            let openID = preferences.getSync(LoginUtil.KEY_OPEN_ID, '') as string;
            let loginTime = preferences.getSync(LoginUtil.KEY_LOGIN_TIME, 0) as number;
            const isExpired = LoginUtil.checkLoginExpired(loginTime);
            hilog.info(0x0000, 'AuthUtil_getLoginInfo', 'isLogin=  %{public}s,userName=  %{public}s ,userAvatar=  %{public}s ,userEmail=  %{public}s , openID=  %{public}s , loginTime=  %{public}s  ', preferences.getSync(LoginUtil.KEY_IS_LOGIN, false) as boolean, preferences.getSync(LoginUtil.KEY_USER_NAME, '') as string, preferences.getSync(LoginUtil.KEY_USER_AVATAR, '') as string, preferences.getSync(LoginUtil.KEY_USER_EMAIL, '') as string, preferences.getSync(LoginUtil.KEY_OPEN_ID, '') as string, preferences.getSync(LoginUtil.KEY_LOGIN_TIME, 0) as number);
            return {
                isLogin: (isLogin) && !isExpired,
                nickName: userName,
                avatarUri: userAvatar,
                email: userEmail,
                openID: openID
            };
        }
        catch (err) {
            hilog.error(0x0000, 'AuthUtil', '读取登录信息失败: %{public}s', (err as BusinessError).message);
            return { isLogin: false };
        }
    }
    /***
     * 检查登录是否过期
     */
    private static checkLoginExpired(loginTime: number): boolean {
        const timeOut = 1 * 24 * 60 * 60 * 1000; // 毫秒计算
        const loginFlage = (Date.now() - loginTime) > timeOut;
        hilog.info(0x0000, 'AuthUtil', `检查登录是否过期状态：${loginFlage}, Date.now() = ${Date.now()}, loginTime = ${loginTime}, 差值：${Date.now() - loginTime}  }`);
        return loginFlage;
    }
    /**
     * 清除登录信息
     */
    static async clearLoginInfo(): Promise<void> {
        // 清除本地存储的登录信息
        try {
            let preferences = PreferenceUtil.getPreference(getContext() as common.UIAbilityContext, LoginUtil.PREFERENCES_NAME);
            preferences.deleteSync(LoginUtil.KEY_IS_LOGIN);
            preferences.deleteSync(LoginUtil.KEY_USER_NAME);
            preferences.deleteSync(LoginUtil.KEY_USER_AVATAR);
            preferences.deleteSync(LoginUtil.KEY_USER_EMAIL);
            preferences.deleteSync(LoginUtil.KEY_OPEN_ID);
            preferences.deleteSync(LoginUtil.KEY_LOGIN_TIME);
            hilog.info(0x0000, 'AuthUtil', '清除登录信息完成');
            preferences.flush();
        }
        catch (err) {
            hilog.error(0x0000, 'AuthUtil', '清除登录信息失败: %{public}s', (err as BusinessError).message);
        }
    }
}
