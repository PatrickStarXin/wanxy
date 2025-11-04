import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type { Permissions as Permissions } from "@ohos:abilityAccessCtrl";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import window from "@ohos:window";
import { Logger } from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/Index";
import type { BusinessError as BusinessError } from "@ohos:base";
const permissions: Array<Permissions> = ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'];
export default class PhoneAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage?.getMainWindowSync().setWindowLayoutFullScreen(true);
        windowStage.loadContent('pages/Index', (err) => {
            // let permissionsUtil = new PermissionsUtil()
            // permissionsUtil.checkPermissions(permissions)
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
            let windowClass: window.Window = windowStage.getMainWindowSync(); // 获取应用主窗口
            // 1. 设置窗口全屏
            let isLayoutFullScreen = true;
            windowClass.setWindowLayoutFullScreen(isLayoutFullScreen)
                .then(() => {
                Logger.info('Succeeded in setting the window layout to full-screen mode.');
            })
                .catch((err: BusinessError) => {
                Logger.error('Failed to set the window layout to full-screen mode. Cause:' + JSON.stringify(err));
            });
            // 2. 获取布局避让遮挡的区域
            const avoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
            const bottomRectHeight = avoidArea.bottomRect.height; // 获取到导航条区域的高度
            AppStorage.setOrCreate('bottomRectHeight', bottomRectHeight);
            const cutoutArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_CUTOUT);
            const topRectHeight = cutoutArea.topRect.height; // 获取到状态栏的高度
            AppStorage.setOrCreate('topRectHeight', topRectHeight + 40);
        });
    }
    onWindowStageDestroy(): void {
        // Main window is destroyed, release UI related resources
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
