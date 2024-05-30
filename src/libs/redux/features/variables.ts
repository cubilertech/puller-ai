import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Variable } from "@/utils/types";


interface VariableArray {
  variables: Variable[];
}

const initialState: VariableArray = {
  variables: [],
};

const variableSlice = createSlice({
  name: "variableUpdate",
  initialState,
  reducers: {
    updateVariable: (state, action: PayloadAction<{ id: string; value: number | string }>) => {
      const { id, value } = action.payload;
      const variable = state.variables.find(variable => variable.id === id);
      if (variable) {
        variable.value = value;
      }
    },
    setVariables: (state, action: PayloadAction<Variable[]>) => {
      state.variables = action.payload;
    },
  },
});

export const { updateVariable, setVariables } = variableSlice.actions;

export const getVariables = (state: RootState) => state.variableUpdate.variables;

export default variableSlice.reducer;
