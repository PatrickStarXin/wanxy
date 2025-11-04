// SQLBuilderTypes.ts
export interface SqlQuery {
  sql: string;   // sql字符串
  params: (string | number)[];  // 参数数组
}