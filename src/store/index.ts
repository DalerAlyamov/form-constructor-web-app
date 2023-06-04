import { init } from "@rematch/core";
import { models, TRootState } from "./models";
import { initialState } from "./utils";

const store = init({
  models,
  redux: {
    initialState: initialState.get(),
  },
});

store.subscribe(() => {
  const { user } = store.getState();

  let state: Partial<TRootState> = {};
  state.user = user;

  return initialState.set(state);
});

export default store;
