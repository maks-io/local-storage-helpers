export const isLocalStorageAvailable = (): boolean => {
  try {
    return "localStorage" in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};
