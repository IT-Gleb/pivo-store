import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IPivoItem } from "../../types";

export interface IItemsState {
  Items: IPivoItem[];
}

const InitialState: IItemsState = {
  Items: [],
};

export const itemsSlice = createSlice({
  name: "pivoItems",
  initialState: InitialState,
  reducers: {
    addPortionItems(state, action: PayloadAction<IPivoItem[]>) {
      state.Items = [];
      if (action.payload.length > 0)
        for (let i = 0; i < action.payload.length; i++) {
          state.Items.push(action.payload[i]);
        }
    },
  },
});

export const { addPortionItems } = itemsSlice.actions;

export default itemsSlice.reducer;
