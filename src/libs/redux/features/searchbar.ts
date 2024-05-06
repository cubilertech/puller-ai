import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  query: "",
  connectQuery: "",
};

const searchBarSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    updateQuery(state: any, action) {
      state.query = action.payload;
    },
    updateConnectQuery(state: any, action) {
      state.connectQuery = action.payload;
    },
  },
});

export const { updateQuery, updateConnectQuery } = searchBarSlice.actions;

export const getSearchQuery = (state: RootState) => state.searchbar.query;
export const getConnectQuery = (state: RootState) =>
  state.searchbar.connectQuery;

export default searchBarSlice.reducer;
