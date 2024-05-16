import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { isClient } from "@/utils/constants";

interface validateRequestState {
  isLoadingRequest: boolean;
  CurrentPage: "validate" | "create";
  PromptValue: string;
}

const initialState: validateRequestState = {
  isLoadingRequest: isClient
    ? window.location.href.split("?")[1]
      ? true
      : false
    : false,
  CurrentPage: isClient
    ? window.location.href.split("?")[1]
      ? "validate"
      : "create"
    : "create",
  PromptValue: "",
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
    UpdatePromptValue: (state, action) => {
      state.PromptValue = action.payload;
    },
  },
});

export const getIsLoadingRequest = (state: RootState) =>
  state.LoadingRequest.isLoadingRequest;
export const getCurrentPage = (state: RootState) =>
  state.LoadingRequest.CurrentPage;

export const getPromptValue = (state: RootState) =>
  state.LoadingRequest.PromptValue;

export const { UpdateIsLoadingRequest, UpdateCurrentPage, UpdatePromptValue } =
  LoadingRequest.actions;
export default LoadingRequest.reducer;
