import { getSpaceRequired } from "./getSpaceRequired";
import { getSpaceRemaining } from "./getSpaceRemaining";

export const isSpaceSufficient = <T extends any = any>(
  keyName: string,
  dataToStore: T,
): boolean => {
  const spaceRequired: number = getSpaceRequired<T>(keyName, dataToStore);
  const spaceRemaining: number = getSpaceRemaining();
  return spaceRemaining > spaceRequired;
};
