import hilog from "@ohos:hilog";
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
