import { IGetOptionsComplete } from "../types/IGetOptionsComplete";

export const GetOptionsDefault: IGetOptionsComplete<any> = {
  actionForKeyNotFound: "RETURN_UNDEFINED",
  actionForValueUndefined: "RETURN_UNDEFINED",
  actionForParsingFailure: "THROW_ERROR",
};
