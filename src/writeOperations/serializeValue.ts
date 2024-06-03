export const serializeValue = <T extends any>(
  context: "upsert" | "insert" | "space-check",
  keyName: string,
  value: T,
): string => {
  let itemSerialized: string;

  try {
    itemSerialized = JSON.stringify(value);
  } catch (e) {
    let errorMsg: string;
    if (context === "space-check") {
      errorMsg = `Could not serialize item when trying to check its required space.\nError is: ${e}`;
    } else {
      errorMsg = `Could not serialize item with key '${keyName}' which you wanted to ${context}.\nError is: ${e}`;
    }
    throw new Error(errorMsg);
  }

  return itemSerialized;
};
