export const getValueSerialized = (keyName: string): string | undefined =>
  localStorage.getItem(keyName);
