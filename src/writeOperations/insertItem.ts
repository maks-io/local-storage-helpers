import { getAllKeys } from "../readOperations/getAllKeys";
import { serializeValue } from "./serializeValue";

export const insertItem = (keyName: string, value: any) => {
  const allExistingKeys = getAllKeys();

  if (allExistingKeys.includes(keyName)) {
    throw new Error(
      `You are trying to insert an item with key '${keyName}', which already exists.`,
    );
  }

  const itemSerialized: string = serializeValue("insert", value, keyName);

  try {
    localStorage.setItem(keyName, itemSerialized);
  } catch (e) {
    throw new Error(
      `Could not insert item with keyName '${keyName}' - the error was: ${e}`,
    );
  }
};
