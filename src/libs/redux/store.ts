import { configureStore } from "@reduxjs/toolkit";
import activeRequestReducer from "./features/activeRequest";

export const store = configureStore({
  reducer: {
    activeRequest: activeRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
