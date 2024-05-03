// checkboxSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    toggleCheckbox(state: any, action) {
      const { index } = action.payload;
      state[index] = !state[index];
    },
  },
});

export const { toggleCheckbox } = checkboxSlice.actions;

export default checkboxSlice.reducer;
