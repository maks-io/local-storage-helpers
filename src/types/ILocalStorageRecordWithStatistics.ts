import { ILocalStorageRecord } from "./ILocalStorageRecord";
import { IStatistics } from "./IStatistics";

export interface ILocalStorageRecordWithStatistics<
  T extends any = any,
  U extends any = T,
> extends ILocalStorageRecord<T, U> {
  statistics: IStatistics;
}
