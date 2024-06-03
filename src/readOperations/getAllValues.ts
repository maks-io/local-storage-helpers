import { getAllKeys } from "./getAllKeys";
import { getValue } from "./getValue";
import { IGetOptions } from "../types/IGetOptions";
import { IKeyFilter } from "../types/IKeyFilter";

export const getAllValues = <T extends any = any, U extends any = T>(
  keyFilter: IKeyFilter = [],
  getOptions: IGetOptions<U> = {},
): (T | U)[] => {
  const relevantKeys = getAllKeys(keyFilter);
  return relevantKeys.map((key) => getValue<T, U>(key, getOptions));
};
