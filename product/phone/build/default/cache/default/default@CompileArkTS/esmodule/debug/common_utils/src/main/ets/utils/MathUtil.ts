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
/**
 * 乘法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function multiply(arg1: number | string, arg2: number | string): number {
    /*let m = 0;
    try {
      // 计算小数点位数
      // 解决精度问题
      // String(arg1) : 将参数转换为字符串
      // .split('.') : 使用小数点作为分隔符将字符串分隔为数组
      // [1] : 获取数组的第二个元素
      const arg1Fractional = String(arg1).split('.')[1]
      const arg2Fractional = String(arg2).split('.')[1]
      m += (arg1Fractional && arg1Fractional.length) || 0
      m += (arg2Fractional && arg2Fractional.length) || 0
    }
    catch (e) {
      return NaN;
    }
    return (
      (Number(String(arg1).replace('.','')) * Number(String(arg2).replace('.',''))) / Math.pow(10,m)
    )*/
    if (arg1 === null || arg2 === null || arg1 === undefined || arg2 === undefined) {
        return NaN;
    }
    // 转换为字符串并删除空格
    const str1 = String(arg1).trim();
    const str2 = String(arg2).trim();
    // 检查是否为有效数字
    if (!/^-?\d*\.?\d+$/.test(str1) || !/^-?\d*\.?\d+$/.test(str2)) {
        return NaN;
    }
    // 确定正负号
    const isNegative1 = str1.startsWith('-');
    const isNegative2 = str2.startsWith('-');
    const resultSign = (isNegative1 !== isNegative2) ? -1 : 1;
    // 去除符号，只做数字运算
    const absStr1 = isNegative1 ? str1.substring(1) : str1;
    const absStr2 = isNegative2 ? str2.substring(1) : str2;
    // 计算小数点位数
    const decimalPlaces1 = absStr1.includes('.') ? absStr1.split('.')[1].length : 0;
    const decimalPlaces2 = absStr2.includes('.') ? absStr1.split('.')[1].length : 0;
    const totalDecimalPlaces1 = decimalPlaces1 + decimalPlaces2;
    // 移除小数点，做整数乘法
    const intStr1 = absStr1.replace('.', '');
    const intStr2 = absStr2.replace('.', '');
    const intResult = Number(intStr1) * Number(intStr2);
    // 加入小数点和符号得出最后结论
    const finalResult = resultSign * (intResult * Math.pow(10, totalDecimalPlaces1));
    return finalResult;
}
/**
 * 除法
 * @param arg1
 * @param arg2
 * @returns
 */
export function division(arg1: number | string, arg2: number | string, decimalPlace?: number | string): number {
    if (arg1 === null || arg2 === null || arg1 === undefined || arg2 === undefined) {
        return NaN;
    }
    if (arg2 === 0) {
        throw new Error('除数不能为0');
    }
    // 去除空格，判断非法字符
    const str1 = String(arg1).trim();
    const str2 = String(arg2).trim();
    if (!/^-?\d*\.?\d+$/.test(str1) || !/^-?\d*\.?\d+$/.test(str2)) {
        return NaN;
    }
    // 判断符号
    const isNegative1 = str1.startsWith('-');
    const isNegative2 = str2.startsWith('-');
    const resultSign = (isNegative1 === isNegative2) ? 1 : -1;
    const absStr1 = isNegative1 ? str1.substring(1) : str1;
    const absStr2 = isNegative2 ? str2.substring(1) : str2;
    const decimalPlace1 = absStr1.includes('.') ? absStr1.split('.')[1].length : 0;
    const decimalPlace2 = absStr2.includes('.') ? absStr2.split('.')[1].length : 0;
    // 除数和被除数放移动最大小数点位置，去除小数点位置
    const factor = Math.pow(10, Math.max(decimalPlace1, decimalPlace2));
    const finalNum1 = Number(absStr1) * factor;
    const finalNum2 = Number(absStr2) * factor;
    const result = finalNum1 / finalNum2 * resultSign;
    if (decimalPlace === null || decimalPlace === undefined) {
        return result;
    }
    const decimal = String(decimalPlace).trim();
    if (!/^-?\d*\.?\d+$/.test(decimal)) {
        throw new Error('精确度含有非法字符');
    }
    // toFixed最大值不能超过20
    const digits = Math.max(0, Math.min(20, Number(decimal)));
    return parseFloat(result.toFixed(digits));
}
/**
 * 加法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function addition(arg1: number | string, arg2: number | string) {
    if (arg1 === null || arg1 === undefined || arg2 === null || arg2 === undefined) {
        return NaN;
    }
    const addNum1 = String(arg1).trim();
    const addNum2 = String(arg2).trim();
    if (!/^-?\d*\.?\d+$/.test(addNum1) || !/^-?\d*\.?\d+$/.test(addNum2)) {
        return NaN;
    }
    const factor1 = addNum1.includes('.') ? addNum1.split('.')[1].length : 0;
    const factor2 = addNum2.includes('.') ? addNum2.split('.')[1].length : 0;
    const factor = Math.pow(10, Math.max(factor1, factor2));
    const result = (parseFloat(addNum1) * factor + parseFloat(addNum2) * factor) / factor;
    return result;
}
/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
export function subtraction(arg1: number | string, arg2: number | string) {
    if (arg1 === null || arg2 === undefined || arg2 === null || arg2 === undefined) {
        return NaN;
    }
    const subNum1 = String(arg1).trim();
    const subNum2 = String(arg2).trim();
    if (!/^-?\d*\.?\d+$/.test(subNum1) || !/^-?\d*\.?\d+$/.test(subNum2)) {
        return NaN;
    }
    const factor1 = subNum1.includes('.') ? subNum1.split('.')[1].length : 0;
    const factor2 = subNum2.includes('.') ? subNum2.split('.')[1].length : 0;
    const factor = Math.max(factor1, factor2);
    const result = (parseFloat(subNum1) * factor - parseFloat(subNum2) * factor) / factor;
    return result;
}
