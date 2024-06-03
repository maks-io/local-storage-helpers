import { IAction } from "./IAction";

export type IActionOrCustomFunction<T> = IAction | ((keyName: string) => T);
