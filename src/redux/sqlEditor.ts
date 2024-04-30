import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getSQLEditorOpen = (state: RootState) => state.sqlEditor.open;

const SQLEditor = createSlice({
  name: "sqlEditor",
  initialState: {
    open: false,
  },
  reducers: {
    HandleOpenSQL: (state) => {
      state.open = true;
    },
    HandleCloseSQL: (state) => {
      state.open = false;
    },
  },
});

export const { HandleOpenSQL, HandleCloseSQL } = SQLEditor.actions;
export default SQLEditor.reducer;
