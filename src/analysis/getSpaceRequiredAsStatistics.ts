import { getSpaceRequired } from "./getSpaceRequired";
import { IStatistics } from "../types/IStatistics";
import { getSpaceTotal } from "./getSpaceTotal";

export const getSpaceRequiredAsStatistics = <T extends any = any>(
  keyName: string,
  dataToStore: T,
): IStatistics => {
  const spaceTotal = getSpaceTotal();
  const spaceRequired: number = getSpaceRequired<T>(keyName, dataToStore);
  return {
    spaceUsed: spaceRequired,
    spaceUsedPercentage: (spaceRequired / spaceTotal) * 100,
  };
};
