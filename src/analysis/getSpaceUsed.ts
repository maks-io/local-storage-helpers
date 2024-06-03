import { getAllRecords } from "../readOperations/getAllRecords";
import { IKeyFilter } from "../types/IKeyFilter";

export const getSpaceUsed = (keyFilter: IKeyFilter = []): number => {
  return getAllRecords(keyFilter).reduce(
    (previousValue, currentValue) =>
      previousValue + (currentValue.key.length + currentValue.valueRaw.length),
    0,
  );
};
