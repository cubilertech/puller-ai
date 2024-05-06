import { configureStore } from "@reduxjs/toolkit";
import activeRequestReducer from "./features/activeRequest";
import SQLEditorReducer from "./features/sqlEditor";
import validateRequestReducer from "./features/validateRequest";
import checkboxReducer from "./features/checkbox";
import searchbarReducer from "./features/searchbar";

export const store = configureStore({
  reducer: {
    activeRequest: activeRequestReducer,
    SQLEditor: SQLEditorReducer,
    validateRequest: validateRequestReducer,
    checkbox: checkboxReducer,
    searchbar: searchbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
