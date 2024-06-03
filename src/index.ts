import { getSpaceRemaining } from "analysis/getSpaceRemaining";
import { getSpaceRequired } from "analysis/getSpaceRequired";
import { getSpaceRequiredAsStatistics } from "analysis/getSpaceRequiredAsStatistics";
import { getSpaceSummary } from "analysis/getSpaceSummary";
import { getSpaceTotal } from "analysis/getSpaceTotal";
import { getSpaceUsed } from "analysis/getSpaceUsed";
import { getSpaceUsedAsStatistics } from "analysis/getSpaceUsedAsStatistics";
import { isLocalStorageAvailable } from "./tools/isLocalStorageAvailable";
import { isSpaceSufficient } from "analysis/isSpaceSufficient";
import { getAllKeys } from "readOperations/getAllKeys";
import { getAllRecords } from "readOperations/getAllRecords";
import { getAllValues } from "readOperations/getAllValues";
import { getValue } from "readOperations/getValue";
import { ILocalStorageRecord } from "types/ILocalStorageRecord";
import { insertItem } from "writeOperations/insertItem";
import { upsertItem } from "writeOperations/upsertItem";
import { getAllValuesSerialized } from "readOperations/getAllValuesSerialized";
import { getValueSerialized } from "readOperations/getValueSerialized";
import { ISpaceSummary } from "types/ISpaceSummary";
import { IStatistics } from "types/IStatistics";
import { ILocalStorageRecordWithStatistics } from "types/ILocalStorageRecordWithStatistics";
import { IKeyFilter } from "types/IKeyFilter";
import { IKeyFilterFn } from "types/IKeyFilterFn";

export {
  // tools:
  isLocalStorageAvailable,
  // writeOperations:
  insertItem,
  upsertItem,
  // readOperations:
  getAllKeys,
  getAllRecords,
  getAllValues,
  getAllValuesSerialized,
  getValue,
  getValueSerialized,
  // analysis:
  getSpaceRemaining,
  getSpaceRequired,
  getSpaceRequiredAsStatistics,
  getSpaceSummary,
  getSpaceTotal,
  getSpaceUsed,
  getSpaceUsedAsStatistics,
  isSpaceSufficient,
};

export type {
  IKeyFilter,
  IKeyFilterFn,
  ILocalStorageRecord,
  ILocalStorageRecordWithStatistics,
  ISpaceSummary,
  IStatistics,
};
