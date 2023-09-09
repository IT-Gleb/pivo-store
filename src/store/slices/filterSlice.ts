import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterData } from "../../types";

const initialState: IFilterData = {
  serchText: "",
  howSort: 0,
  priceData: 0,
  isFiltered: false,
  currentPage: 0,
};

export const FilterSlice = createSlice({
  name: "filterData",
  initialState,
  reducers: {
    updateFilterPriceData(state, action: PayloadAction<number>) {
      state.priceData = action.payload;
    },
    updateHowSort(state, action: PayloadAction<number>) {
      state.howSort = action.payload;
    },
    updateSerchText(state, action: PayloadAction<string>) {
      state.serchText = action.payload;
    },
    updateIsFiltered(state, action: PayloadAction<boolean>) {
      state.isFiltered = action.payload;
    },
    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    updateAllData(state, action: PayloadAction<IFilterData>) {
      state = action.payload;
    },
    clearFilters(state) {
      state.howSort = 0;
      state.isFiltered = false;
      state.priceData = 0;
      state.serchText = "";
      state.currentPage = 0;
    },
  },
});

export const {
  updateSerchText,
  updateHowSort,
  updateFilterPriceData,
  updateIsFiltered,
  updateCurrentPage,
  updateAllData,
  clearFilters,
} = FilterSlice.actions;

export default FilterSlice.reducer;
