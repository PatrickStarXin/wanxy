import { AnimatedMap } from "@bundle:com.atomicservice.5765880207855620561/phone@router_manage/ets/commons/AnimateMap";
import type { NavRouterMap } from '../commons/NavRouterMap';
import type NavRouterInfo from './NavRouterInfo';
export class RouterModule {
    static stackMap: Map<string, NavPathStack> = new Map<string, NavPathStack>();
    // 注册路由栈，存入stackMap
    public static createStack(name: string, stack: NavPathStack) {
        RouterModule.stackMap.set(name, stack);
    }
    // 获取指定栈名的路由栈
    public static getStack(name: string): NavPathStack | undefined {
        return RouterModule.stackMap.get(name);
    }
    // 跳转到指定路由栈的指定路由页面
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
