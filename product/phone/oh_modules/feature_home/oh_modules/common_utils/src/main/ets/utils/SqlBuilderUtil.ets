// 动态sql拼接
import { SqlQuery } from "../model/SQLBuilderTypes";

type SQLParam = string | number | boolean | null | undefined;

export class SQLBuilder {
  private baseSql: string;   // 基础语句
  private conditions: string[] = [];    // 动态收集where条件片段
  private rawParams: SQLParam[] = [];   // 存储与条件对应的参数值

  constructor(baseSql: string) {
    this.baseSql = baseSql;
  }

  // 类型守卫：确保值是可用的 SQL 参数
  // 将入参注册
  addCondition(condition: string, value: string | number | boolean | null | undefined): SQLBuilder {
    if (value !== null) {
      this.conditions.push(condition);
      // 类型断言：明确告诉编译器这是安全的值
      this.rawParams.push(value);   // 类型断言
    }
    // 支持链式调用,以至于能添加多个条件
    // 返回 this 以支持连续操作（如 builder.addCondition(...).addCondition(...)）
    return this;
  }


  // 分离压入入参和拼接sql
  // 避免链式调用的时候都重新解析/拼接整个 SQL
  // 可在不同位置添加条件，最后统一构建
  build(): SqlQuery  {

    const safeParams = this.rawParams.filter(
      param => param !== null && param !== undefined
    ) as (string | number)[];

    // 构建 SQL
    let finalSql = this.baseSql;

    if (this.conditions.length > 0) {
      const whereClause = this.conditions.join(' AND ');

      const orderbyIndex = finalSql.toUpperCase().indexOf('ORDER BY');
      // 检查原始 SQL 是否已有 WHERE 子句
      const whereIndex = finalSql.toUpperCase().indexOf('WHERE');
      if (orderbyIndex === -1){
        if (whereIndex === -1) {
          // 没有 order WHERE 子句，直接添加
          finalSql += ` WHERE ${whereClause}`;
        }
        else {
          // 在现有WHERE后追加条件（保留原条件）
          finalSql = finalSql.replace(
            /(WHERE\s+)/i,
            `$1${whereClause} AND `
          );
        }
      }
      else {
        if (whereIndex === -1) {
          finalSql = finalSql.substring(0,orderbyIndex) + ` WHERE ${whereClause} `   + finalSql.substring(orderbyIndex);
        }
        else {
          finalSql = finalSql.substring(0,orderbyIndex) + ` AND ${whereClause}} ` + finalSql.substring(orderbyIndex);
        }
      }
    }

    return {
      sql: finalSql,
      params: safeParams
    };

  }
}