import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPivoItem, type ISerchData } from "../../types";
import orderBy from "lodash/orderBy";

const initialState: ISerchData = {
  SerchText: "",
  CurrentPage: 1,
  serchedData: [],
};

export const SerchSlice = createSlice({
  name: "serchedData",
  initialState,
  reducers: {
    updateSerchedData(state, action: PayloadAction<IPivoItem[]>) {
      state.serchedData = [];
      state.serchedData = Array.from(action.payload);
      state.serchedData = orderBy(state.serchedData, ["_price"], ["desc"]);
    },
    zeroData(state) {
      state.SerchText = "";
      state.CurrentPage = 1;
      state.serchedData = [];
    },
    updateSerchDataText(state, action: PayloadAction<string>) {
      state.SerchText = action.payload;
    },
    updateSerchCurrentPage(state, action: PayloadAction<number>) {
      state.CurrentPage = action.payload;
    },
  },
});

export const {
  updateSerchedData,
  zeroData,
  updateSerchDataText,
  updateSerchCurrentPage,
} = SerchSlice.actions;

export default SerchSlice.reducer;
