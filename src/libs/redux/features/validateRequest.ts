import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface validateRequestState {
  value: {
    variable: string;
  };
  username: string;
}

const initialState: validateRequestState = {
  value: {
    variable: "TXN_SZNAL table",
  },
  username: "",
};

const validateRequest = createSlice({
  name: "validateData",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state.value.variable = action.payload;
    },
    updateUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const getValidateData = (state: RootState) =>
  state.validateRequest.value.variable;

export const getUserName = (state: RootState) =>
  state.validateRequest.username;

export const { updateValue, updateUserName } = validateRequest.actions;
export default validateRequest.reducer;
