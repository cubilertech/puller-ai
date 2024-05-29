import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckboxState {
  [key: number]: boolean;
}

const initialState: CheckboxState = {};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    toggleCheckbox(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state[index] = !state[index];
    },
    setCheckedItems(state, action: PayloadAction<boolean[]>) {
      return action.payload.reduce((acc, checked, index) => {
        acc[index] = checked;
        return acc;
      }, {} as CheckboxState);
    },
  },
});

export const { toggleCheckbox, setCheckedItems } = checkboxSlice.actions;

export default checkboxSlice.reducer;
