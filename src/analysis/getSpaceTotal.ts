import { getSpaceUsed } from "./getSpaceUsed";
import { getSpaceRemaining } from "./getSpaceRemaining";

export const getSpaceTotal = (): number => {
  return getSpaceUsed() + getSpaceRemaining();
};
