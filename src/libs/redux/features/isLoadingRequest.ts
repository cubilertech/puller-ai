import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface validateRequestState {
  isLoadingRequest: boolean;
  CurrentPage: "validate" | "create";
}

const initialState: validateRequestState = {
  isLoadingRequest: window.location.href.split("?")[1] ? true : false,
  CurrentPage: window.location.href.split("?")[1] ? "validate" : "create",
};

const LoadingRequest = createSlice({
  name: "loadingRequest",
  initialState,
  reducers: {
    UpdateIsLoadingRequest: (state, action) => {
      state.isLoadingRequest = action.payload;
    },
    UpdateCurrentPage: (state, action) => {
      state.CurrentPage = action.payload;
    },
  },
});

export const getIsLoadingRequest = (state: RootState) =>
  state.LoadingRequest.isLoadingRequest;
export const getCurrentPage = (state: RootState) =>
  state.LoadingRequest.CurrentPage;

export const { UpdateIsLoadingRequest, UpdateCurrentPage } =
  LoadingRequest.actions;
export default LoadingRequest.reducer;
