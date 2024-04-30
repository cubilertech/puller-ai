import { configureStore } from "@reduxjs/toolkit";
import sqlEditorReducer from "./sqlEditor";

const store = configureStore({
  reducer: {
    sqlEditor: sqlEditorReducer,
  },
});

export default store;
export type RootState = {
  sqlEditor: ReturnType<typeof sqlEditorReducer>;
};
