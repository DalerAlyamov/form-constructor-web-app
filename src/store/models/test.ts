import { createModel } from "@rematch/core";

const test = createModel()({
  state: null,
  reducers: {
    test() {
      return null;
    },
  },
});

export default test;
