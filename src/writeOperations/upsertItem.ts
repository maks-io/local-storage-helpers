import { serializeValue } from "./serializeValue";

export const upsertItem = (keyName: string, value: any) => {
  const itemSerialized: string = serializeValue("upsert", keyName, value);

  try {
    localStorage.setItem(keyName, itemSerialized);
  } catch (e) {
    throw new Error(
      `Could not upsert item with keyName '${keyName}' - the error was: ${e}`,
    );
  }
};
