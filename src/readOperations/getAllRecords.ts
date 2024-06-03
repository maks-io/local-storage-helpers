import { ILocalStorageRecord } from "../types/ILocalStorageRecord";
import { getAllKeys } from "./getAllKeys";
import { getValue } from "./getValue";
import { IGetOptions } from "../types/IGetOptions";
import { IKeyFilter } from "../types/IKeyFilter";

export const getAllRecords = <T extends any = any, U extends any = T>(
  keyFilter: IKeyFilter = [],
  getOptions: IGetOptions<U> = {},
): ILocalStorageRecord<T, U>[] => {
  const relevantKeys: string[] = getAllKeys(keyFilter);

  return relevantKeys.map((key) => ({
    key,
    value: getValue<T, U>(key, getOptions),
    valueRaw: localStorage.getItem(key),
  }));
};
