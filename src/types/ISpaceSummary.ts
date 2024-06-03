import { ILocalStorageRecordWithStatistics } from "./ILocalStorageRecordWithStatistics";

export interface ISpaceSummary {
  spaceTotal: number;
  spaceUsed: number;
  spaceUsedPercentage: number;
  spaceRemaining: number;
  spaceRemainingPercentage: number;
  allRecordsWithStatistics: ILocalStorageRecordWithStatistics[];
}
