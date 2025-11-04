import promptAction from "@ohos:promptAction";
import preferences from "@ohos:data.preferences";
import CommonConstants from "@bundle:com.atomicservice.5765880207855620561/phone@common_utils/ets/constants/CommonConstants";
import type { Context as Context } from "@ohos:abilityAccessCtrl";
/**
 * Preference model.
 *
 * @param fruitData Fruit data.
 */
export class PreferenceUtil {
    public static getPreference(context: Context, name: string) {
        let options: preferences.Options = { name: name };
        let dataPreferences: preferences.Preferences | null = preferences.getPreferencesSync(context, options);
        return dataPreferences;
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
    }
    ;
}
