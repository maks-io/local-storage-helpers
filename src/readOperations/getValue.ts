import { IGetOptions } from "../types/IGetOptions";
import { GetOptionsDefault } from "./GetOptionsDefault";
import { getValueSerialized } from "./getValueSerialized";

export const getValue = <T extends any = any, U extends any = T>(
  keyName: string,
  getOptions: IGetOptions<U> = {},
): T | U => {
  const getOptionsEffective = { ...GetOptionsDefault, ...getOptions };

  const value: string | undefined = getValueSerialized(keyName);

  let parsedValue: T;

  if (value === undefined) {
    // value === undefined if there is no entry in the localStorage for the provided key
    const { actionForKeyNotFound, fallbackValue, fallbackValueFn } =
      getOptionsEffective;
    if (typeof actionForKeyNotFound === "function") {
      parsedValue = actionForKeyNotFound(keyName);
    } else if (actionForKeyNotFound === "RETURN_FALLBACK") {
      parsedValue = fallbackValue;
    } else if (actionForKeyNotFound === "CALL_FALLBACK_FN") {
      if (!fallbackValueFn || typeof fallbackValueFn !== "function") {
        throw new Error(
          `You cannot define CALL_FALLBACK_FN without providing a fallbackValueFn`,
        );
      }
      parsedValue = fallbackValueFn(keyName);
    } else if (actionForKeyNotFound === "RETURN_UNDEFINED") {
      parsedValue = undefined;
    } else if (actionForKeyNotFound === "RETURN_NULL") {
      parsedValue = null;
    } else {
      throw new Error(`No local storage entry found for key '${keyName}'`);
    }
  } else if (value === "undefined") {
    const { actionForValueUndefined, fallbackValue, fallbackValueFn } =
      getOptionsEffective;
    if (typeof actionForValueUndefined === "function") {
      parsedValue = actionForValueUndefined(keyName);
    } else if (actionForValueUndefined === "RETURN_FALLBACK") {
      parsedValue = fallbackValue;
    } else if (actionForValueUndefined === "CALL_FALLBACK_FN") {
      if (!fallbackValueFn || typeof fallbackValueFn !== "function") {
        throw new Error(
          `You cannot define CALL_FALLBACK_FN without providing a fallbackValueFn`,
        );
      }
      parsedValue = fallbackValueFn(keyName);
    } else if (actionForValueUndefined === "RETURN_UNDEFINED") {
      parsedValue = undefined;
    } else if (actionForValueUndefined === "RETURN_NULL") {
      parsedValue = null;
    } else {
      throw new Error(
        `Local storage entry for key '${keyName}' has value 'undefined'`,
      );
    }
  } else {
    try {
      parsedValue = JSON.parse(value);
    } catch (e) {
      const { actionForParsingFailure, fallbackValue, fallbackValueFn } =
        getOptionsEffective;
      if (typeof actionForParsingFailure === "function") {
        parsedValue = actionForParsingFailure(keyName);
      } else if (actionForParsingFailure === "RETURN_FALLBACK") {
        parsedValue = fallbackValue;
      } else if (actionForParsingFailure === "CALL_FALLBACK_FN") {
        if (!fallbackValueFn || typeof fallbackValueFn !== "function") {
          throw new Error(
            `You cannot define CALL_FALLBACK_FN without providing a fallbackValueFn`,
          );
        }
        parsedValue = fallbackValueFn(keyName);
      } else if (actionForParsingFailure === "RETURN_UNDEFINED") {
        parsedValue = undefined;
      } else if (actionForParsingFailure === "RETURN_NULL") {
        parsedValue = null;
      } else {
        throw new Error(
          `Local storage entry for key '${keyName}' could not be parsed.\nError is: ${e}`,
        );
      }
    }
  }

  return parsedValue;
};
