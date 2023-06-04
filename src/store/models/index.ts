import { Models, RematchDispatch, RematchRootState } from "@rematch/core";
import test from "./test";

export interface IRootModel extends Models<IRootModel> {
  test: typeof test;
}
export type TDispatch = RematchDispatch<IRootModel>;
export type TRootState = RematchRootState<IRootModel>;
export const models: IRootModel = { test };
