import { AnimatedMap } from "@normalized:N&&&router_manage/src/main/ets/commons/AnimateMap&1.0.0";
import type { NavRouterMap } from '../commons/NavRouterMap';
import type NavRouterInfo from './NavRouterInfo';
export class RouterModule {
    // 维护一个路由栈的映射表，key是栈名，value是对应的导航栈实例
    static stackMap: Map<string, NavPathStack> = new Map<string, NavPathStack>();
    // 注册路由栈，存入stackMap
    // 将路由栈实例注册到管理器中，应用启动时初始化各个导航栈
    public static createStack(name: string, stack: NavPathStack) {
        RouterModule.stackMap.set(name, stack);
    }
    // 获取指定栈名的路由栈
    public static getStack(name: string): NavPathStack | undefined {
        return RouterModule.stackMap.get(name);
    }
    // 跳转到指定路由栈的指定路由页面
    // 查找栈，调用栈的push方法，向指定栈压入新页面
    /***
     * RouterModule.push({
     * stackName: NavStackMap.MAIN_STACK,      // 目标导航栈（业务导航栈，可以有多个，相同业务放到一个导航栈中）
     * url: NavRouterMap.PAGE_FOOD_DETAIL,     // 目标页面路由
     * animateSwitch: AnimatedMap.ON,          // 是否开启动画，是否显示过渡动画
     * param: JSON.stringify(foodDetail)       // 传递的参数数据，foodDetail 是当前食物的详细信息对象，JSON.stringify() 将对象序列化为字符串进行传递，在目标页面通过 RouterModule.getNavParam() 接收并解析，这样详情页就知道要显示哪个食物的信息
     * })
     * 如上是调用实例
     */
    public static push(info: NavRouterInfo) {
        const stack = RouterModule.getStack(info.stackName);
        if (stack) {
            stack.pushPathByName(info.url, info.param, info.animateSwitch === AnimatedMap.ON);
        }
        else {
            console.error('push nav failed, stackName:' + info.stackName + ', url:' + info.url);
        }
    }
    // 将指定路由栈的栈顶页面退出，将info指定的NavDestination页面信息入栈
    // 替换当前页面，不保留在栈中
    public static replace(info: NavRouterInfo) {
        const stack = RouterModule.getStack(info.stackName);
        if (stack) {
            stack.replacePathByName(info.url, info.param, info.animateSwitch === AnimatedMap.ON);
        }
        else {
            console.error('replace nav failed, stackName:' + info.stackName + ', url:' + info.url);
        }
    }
    // 弹出栈顶元素
    // 返回
    public static pop(stackName: string, animated?: boolean) {
        RouterModule.getStack(stackName)?.pop(animated);
    }
    // 回退路由栈到由栈底开始第一个名为name的NavDestination页面
    public static popToName(stackName: string, url: NavRouterMap, animated?: boolean) {
        RouterModule.getStack(stackName)?.popToName(url, animated);
    }
    // 清除指定栈中的所有页面
    public static clear(stackName: string, animated?: boolean) {
        RouterModule.getStack(stackName)?.clear(animated);
    }
    // 获取指定栈中指定页面的参数
    public static getNavParam(info: NavRouterInfo): Array<any> {
        const stack = RouterModule.getStack(info.stackName);
        if (stack) {
            return stack.getParamByName(info.url);
        }
        console.info('stack does not exist');
        return [];
    }
}
