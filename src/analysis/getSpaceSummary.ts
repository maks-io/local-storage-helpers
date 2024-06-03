import { getSpaceUsed } from "./getSpaceUsed";
import { getSpaceRemaining } from "./getSpaceRemaining";
import { getAllRecords } from "../readOperations/getAllRecords";
import { ILocalStorageRecordWithStatistics } from "../types/ILocalStorageRecordWithStatistics";
import { getSpaceTotal } from "./getSpaceTotal";
import { ISpaceSummary } from "../types/ISpaceSummary";

export const getSpaceSummary = <
  T extends any = any,
  U extends any = T,
>(): ISpaceSummary => {
  const spaceRemaining = getSpaceRemaining();
  const spaceTotal = getSpaceTotal();

  const allRecords = getAllRecords();
  const allRecordsWithStatistics: ILocalStorageRecordWithStatistics<T, U>[] =
    allRecords.map((rec) => {
      const spaceUsed = getSpaceUsed([(keyName) => keyName === rec.key]);
      const spaceUsedPercentage = (spaceUsed / spaceTotal) * 100;

      return {
        ...rec,
        statistics: {
          spaceUsed,
          spaceUsedPercentage,
        },
      };
    });

  const spaceUsed = spaceTotal - spaceRemaining;
  const spaceUsedPercentage = (spaceUsed / spaceTotal) * 100;
  const spaceRemainingPercentage = 100 - spaceUsedPercentage;

  return {
    spaceTotal,
    spaceUsed,
    spaceUsedPercentage,
    spaceRemaining,
    spaceRemainingPercentage,
    allRecordsWithStatistics,
  };
};
