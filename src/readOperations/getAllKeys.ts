import { IKeyFilter } from "../types/IKeyFilter";

export const getAllKeys = (keyFilter: IKeyFilter = []): string[] => {
  const allKeys = Object.keys(localStorage);

  if (keyFilter.length === 0) {
    return allKeys;
  }

  let filteredKeys: string[] = allKeys;

  if (typeof keyFilter === "string") {
    filteredKeys = [filteredKeys.find((key) => key === keyFilter)];
  } else {
    keyFilter.forEach((f) => {
      filteredKeys = filteredKeys.filter(f);
    });
  }

  return filteredKeys;
};
