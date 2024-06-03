export interface ILocalStorageRecord<T extends any = any, U extends any = T> {
  key: string;
  value: T | U;
  valueRaw: string;
}
