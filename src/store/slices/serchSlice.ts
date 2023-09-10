import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPivoItem, type ISerchData } from "../../types";

const initialState: ISerchData = {
  SerchText: "",
  serchedData: [],
};

export const SerchSlice = createSlice({
  name: "serchedData",
  initialState,
  reducers: {
    updateSerchedData(state, action: PayloadAction<IPivoItem[]>) {
      state.serchedData = [];
      state.serchedData = Array.from(action.payload);
    },
    zeroData(state) {
      (state.SerchText = ""), (state.serchedData = []);
    },
    updateSerchDataText(state, action: PayloadAction<string>) {
      state.SerchText = action.payload;
    },
  },
});

export const { updateSerchedData, zeroData, updateSerchDataText } =
  SerchSlice.actions;

export default SerchSlice.reducer;
