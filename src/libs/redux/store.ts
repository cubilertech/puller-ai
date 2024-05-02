import { configureStore } from "@reduxjs/toolkit";
import activeRequestReducer from "./features/activeRequest";
import SQLEditorReducer from "./features/sqlEditor";

export const store = configureStore({
  reducer: {
    activeRequest: activeRequestReducer,
    SQLEditor: SQLEditorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
