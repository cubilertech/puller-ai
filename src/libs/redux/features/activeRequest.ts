import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getActiveRequest = (state: RootState) => state.activeRequest;

interface ActiveRequestState {
  description: string;
  graph: any[]; // Replace 'any' with the actual type of 'graph' if known
  id: string;
  sql: string;
  target: string;
  variables: any[]; // Replace 'any' with the actual type of 'variables' if known
}

const initialState: ActiveRequestState = {
  description: "",
  graph: [],
  id: "",
  sql: "",
  target: "",
  variables: [],
};

const activeRequest = createSlice({
  name: "activeRequest",
  initialState,
  reducers: {
    setActiveRequest: (state, action) => {
      const { id, sql, graph, description, target, variables } = action.payload;
      state.description = description;
      state.graph = graph;
      state.id = id;
      state.sql = sql;
      state.target = target;
      state.variables = variables;
    },
  },
});

export const { setActiveRequest } = activeRequest.actions;

export default activeRequest.reducer;
