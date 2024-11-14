import { configureStore } from "@reduxjs/toolkit";
import activeRequestReducer from "./features/activeRequest";
import validateRequestReducer from "./features/validateRequest";
import checkboxReducer from "./features/checkbox";
import searchbarReducer from "./features/searchbar";
import LoadingRequestReducer from "./features/isLoadingRequest";
import globalLoadingReducer from "./features/globalLoadings";
import variableReducer from "./features/variables";
import ClientDataReducer from "./features/clientdata";

export const store = configureStore({
  reducer: {
    activeRequest: activeRequestReducer,
    validateRequest: validateRequestReducer,
    checkbox: checkboxReducer,
    searchbar: searchbarReducer,
    LoadingRequest: LoadingRequestReducer,
    globalLoading: globalLoadingReducer,
    variableUpdate: variableReducer,
    ClientData: ClientDataReducer, // Correct position and comma
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
