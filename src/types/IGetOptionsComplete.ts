import { IActionOrCustomFunction } from "./IActionOrCustomFunction";

export type IGetOptionsComplete<U> = {
  fallbackValue?: U;
  fallbackValueFn?: (keyName: string) => U;
  actionForKeyNotFound: IActionOrCustomFunction<U>;
  actionForValueUndefined: IActionOrCustomFunction<U>;
  actionForParsingFailure: IActionOrCustomFunction<U>;
};
