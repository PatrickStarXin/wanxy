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
export function multiply(arg1, arg2) {
    let m = 0;
    try {
        const arg1Fractional = String(arg1).split('.')[1];
        const arg2Fractional = String(arg2).split('.')[1];
        m += (arg1Fractional && arg1Fractional.length) || 0;
        m += (arg2Fractional && arg2Fractional.length) || 0;
    }
    catch (e) {
        return NaN;
    }
    return ((Number(String(arg1).replace('.', '')) *
        Number(String(arg2).replace('.', ''))) /
        Math.pow(10, m));
}
/**
 * 除法
 * @param arg1
 * @param arg2
 * @returns
 */
export function division(arg1, arg2) {
    try {
        const arg1Fractional = String(arg1).split('.')[1];
        const arg2Fractional = String(arg2).split('.')[1];
        const arg1Length = (arg1Fractional && arg1Fractional.length) || 0;
        const arg2Length = (arg2Fractional && arg2Fractional.length) || 0;
        const differenceMultiple = Math.pow(10, arg2Length - arg1Length);
        return multiply(Number(String(arg1).replace('.', '')) /
            Number(String(arg2).replace('.', '')), differenceMultiple);
    }
    catch (e) {
        return NaN;
    }
}
/**
 * 加法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function addition(arg1, arg2) {
    try {
        const arg1Fractional = String(arg1).split('.')[1];
        const arg2Fractional = String(arg2).split('.')[1];
        const arg1Length = (arg1Fractional && arg1Fractional.length) || 0;
        const arg2Length = (arg2Fractional && arg2Fractional.length) || 0;
        const expandedMultiplier = Math.pow(10, Math.max(arg1Length, arg2Length));
        return ((multiply(arg1, expandedMultiplier) +
            multiply(arg2, expandedMultiplier)) /
            expandedMultiplier);
    }
    catch (e) {
        return NaN;
    }
}
/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
export function subtraction(arg1, arg2) {
    try {
        const arg1Fractional = String(arg1).split('.')[1];
        const arg2Fractional = String(arg2).split('.')[1];
        const arg1Length = (arg1Fractional && arg1Fractional.length) || 0;
        const arg2Length = (arg2Fractional && arg2Fractional.length) || 0;
        const expandedMultiplier = Math.pow(10, Math.max(arg1Length, arg2Length));
        return ((multiply(arg1, expandedMultiplier) -
            multiply(arg2, expandedMultiplier)) /
            expandedMultiplier);
    }
    catch (e) {
        return NaN;
    }
}
//# sourceMappingURL=MathUtil.js.map