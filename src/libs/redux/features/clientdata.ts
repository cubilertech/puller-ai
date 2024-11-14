import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Client } from "@/utils/types";

interface type {
  data?: Client;
}
const initialState: type = {
  data: undefined,
};

const ClientData = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setClientData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const getClientData = (state: RootState) => state.ClientData.data;

export const { setClientData } = ClientData.actions;
export default ClientData.reducer;
