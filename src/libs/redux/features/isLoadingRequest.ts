import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { isClient } from "@/utils/constants";

interface validateRequestState {
  isLoadingPrompt: boolean;
  isLoadingRequests: boolean;
  CurrentPage: "validate" | "create";
  PromptValue: string;
  ConsoleMessages: string;
}

const initialState: validateRequestState = {
  isLoadingPrompt: false,
  isLoadingRequests: isClient
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
  ConsoleMessages: "",
};

const LoadingRequest = createSlice({
  name: "loadingRequest",
  initialState,
  reducers: {
    UpdateIsLoadingPrompt: (state, action) => {
      state.isLoadingPrompt = action.payload;
    },
    UpdateIsLoadingRequest: (state, action) => {
      state.isLoadingRequests = action.payload;
    },
    UpdateCurrentPage: (state, action) => {
      state.CurrentPage = action.payload;
    },
    UpdatePromptValue: (state, action) => {
      state.PromptValue = action.payload;
    },
    UpdateConsoleMessages: (state, action) => {
      state.ConsoleMessages = action.payload;
    },
  },
});

export const getIsLoadingRequest = (state: RootState) =>
  state.LoadingRequest.isLoadingRequests;
export const getIsLoadingPrompt = (state: RootState) =>
  state.LoadingRequest.isLoadingPrompt;
export const getCurrentPage = (state: RootState) =>
  state.LoadingRequest.CurrentPage;
export const getPromptValue = (state: RootState) =>
  state.LoadingRequest.PromptValue;
export const getConsoleMessages = (state: RootState) =>
  state.LoadingRequest.ConsoleMessages;

export const {
  UpdateIsLoadingRequest,
  UpdateCurrentPage,
  UpdatePromptValue,
  UpdateIsLoadingPrompt,
  UpdateConsoleMessages,
} = LoadingRequest.actions;
export default LoadingRequest.reducer;
