import { serializeValue } from "../writeOperations/serializeValue";

export const getSpaceRequired = <T extends any = any>(
  keyName: string,
  dataToStore: T,
): number => {
  const itemSerialized: string = serializeValue<T>(
    "space-check",
    keyName,
    dataToStore,
  );
  return keyName.length + itemSerialized.length;
};
