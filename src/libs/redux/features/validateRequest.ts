import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface validateRequestState {
  value: {
    variable: string;
  };
}

const initialState: validateRequestState = {
  value: {
    variable: "TXN_SZNAL table",
  },
};

const validateRequest = createSlice({
  name: "validateData",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state.value.variable = action.payload;
    },
  },
});

export const getValidateData = (state: RootState) =>
  state.validateRequest.value.variable;

export const { updateValue } = validateRequest.actions;
export default validateRequest.reducer;
