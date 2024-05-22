import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface validateRequestState {
  normalLoading: boolean;
  submitPromptLoading: boolean;
  submitExecuteLoading: boolean;
  submitValidateLoading: boolean;
  loadingText: string;
}

const initialState: validateRequestState = {
  normalLoading: false,
  submitPromptLoading: false,
  submitExecuteLoading: false,
  submitValidateLoading: false,
  loadingText: "",
};

const LoadingRequest = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    setNormalLoading: (state, action) => {
      state.normalLoading = action.payload;
    },
    setSubmitPromptLoading: (state, action) => {
      state.submitPromptLoading = action.payload;
    },
    setSubmitExecuteLoading: (state, action) => {
      state.submitExecuteLoading = action.payload;
    },
    setSubmitValidateLoading: (state, action) => {
      state.submitValidateLoading = action.payload;
    },
    setLoadingText: (state, action) => {
      state.loadingText = action.payload;
    },
  },
});

export const getNormalLoading = (state: RootState) =>
  state.globalLoading.normalLoading;
export const getSubmitPromptLoading = (state: RootState) =>
  state.globalLoading.submitPromptLoading;
export const getSubmitExecuteLoading = (state: RootState) =>
  state.globalLoading.submitExecuteLoading;
export const getSubmitValidateLoading = (state: RootState) =>
  state.globalLoading.submitValidateLoading;
export const getLoadingText = (state: RootState) =>
  state.globalLoading.loadingText;

export const {
  setNormalLoading,
  setSubmitPromptLoading,
  setSubmitExecuteLoading,
  setSubmitValidateLoading,
  setLoadingText,
} = LoadingRequest.actions;
export default LoadingRequest.reducer;
