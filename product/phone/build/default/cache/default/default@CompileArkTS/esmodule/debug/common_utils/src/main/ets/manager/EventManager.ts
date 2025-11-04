import hilog from "@ohos:hilog";
export default class EventManager {
    private static instance: EventManager = new EventManager();
    private listeners: Map<string, Array<() => void>> = new Map();
    static getInstance(): EventManager {
        hilog.info(0x0000, 'EventManager', '调用监听，数据刷新');
        return EventManager.instance;
    }
    // 监听事件
    on(event: string, callback: () => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback); // 添加回调到数组
        hilog.info(0x0000, 'EventManager', `注册事件监听: ${event}, 当前监听数: ${this.listeners.get(event)!.length}`);
    }
    // 触发事件
    emit(event: string): void {
        hilog.info(0x0000, 'EventManager', `触发事件: ${event}`);
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            hilog.info(0x0000, 'EventManager', `找到 ${callbacks.length} 个回调函数`);
            callbacks.forEach(callback => {
                try {
                    callback();
                }
                catch (err) {
                    hilog.error(0x0000, 'EventManager', `执行回调失败: ${JSON.stringify(err)}`);
                }
            });
        }
        else {
            hilog.warn(0x0000, 'EventManager', `事件 ${event} 没有监听器`);
        }
    }
    // 移除监听
    off(event: string, callback: () => void): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
                hilog.info(0x0000, 'EventManager', `移除事件监听: ${event}`);
            }
        }
    }
}
