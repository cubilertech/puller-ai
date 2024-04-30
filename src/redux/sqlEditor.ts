import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getSQLEditorOpen = (state: RootState) => state.sqlEditor.open;
export const getOptionbarOpen = (state: RootState) =>
  state.sqlEditor.optionbarOpen;

const SQLEditor = createSlice({
  name: "sqlEditor",
  initialState: {
    open: false,
    optionbarOpen: false,
  },
  reducers: {
    HandleOpenSQL: (state) => {
      state.open = true;
      state.optionbarOpen = false;
    },
    HandleCloseSQL: (state) => {
      state.open = false;
    },
    HandleOpenOptionbar: (state) => {
      state.open = false;
      state.optionbarOpen = true;
    },
    HandleCloseOptionbar: (state) => {
      state.optionbarOpen = false;
    },
  },
});

export const {
  HandleOpenSQL,
  HandleCloseSQL,
  HandleCloseOptionbar,
  HandleOpenOptionbar,
} = SQLEditor.actions;
export default SQLEditor.reducer;
