import { IKeyFilter } from "../types/IKeyFilter";
import { IStatistics } from "../types/IStatistics";
import { getSpaceTotal } from "./getSpaceTotal";
import { getSpaceUsed } from "./getSpaceUsed";

export const getSpaceUsedAsStatistics = (
  keyFilter: IKeyFilter = [],
): IStatistics => {
  const spaceTotal = getSpaceTotal();
  const spaceUsedOfRelevantItems = getSpaceUsed(keyFilter);
  return {
    spaceUsed: spaceUsedOfRelevantItems,
    spaceUsedPercentage: (spaceUsedOfRelevantItems / spaceTotal) * 100,
  };
};
