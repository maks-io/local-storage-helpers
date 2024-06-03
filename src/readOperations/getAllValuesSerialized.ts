import { getAllKeys } from "./getAllKeys";
import { IKeyFilter } from "../types/IKeyFilter";
import { getValueSerialized } from "./getValueSerialized";

export const getAllValuesSerialized = (
  keyFilter: IKeyFilter = [],
): string[] => {
  const relevantKeys = getAllKeys(keyFilter);
  return relevantKeys
    .map((key) => getValueSerialized(key))
    .filter((value) => value !== undefined);
};
