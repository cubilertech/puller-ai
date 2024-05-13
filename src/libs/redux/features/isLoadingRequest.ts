import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface validateRequestState {
  isLoadingRequest: boolean;
}

const initialState: validateRequestState = {
  isLoadingRequest: false,
};

const LoadingRequest = createSlice({
  name: "validateData",
  initialState,
  reducers: {
    UpdateIsLoadingRequest: (state, action) => {
      state.isLoadingRequest = action.payload;
    },
  },
});

export const getIsLoadingRequest = (state: RootState) =>
  state.LoadingRequest.isLoadingRequest;

export const { UpdateIsLoadingRequest } = LoadingRequest.actions;
export default LoadingRequest.reducer;
