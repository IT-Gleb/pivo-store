import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";

export type TBasketItem = {
  id: number;
  timeAdd: number;
  title: string;
  imgPath: string;
  count: number;
  price: number | undefined;
  stars: number | undefined;
};

export interface IBasket {
  userId: string;
  Items: TBasketItem[];
}

const stateInit: IBasket = {
  userId: "",
  Items: [],
};

export const eBasketSlice = createSlice({
  name: "eBasket",
  initialState: stateInit,
  reducers: {
    updateBasketUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    addNewBasketItem(state, action: PayloadAction<TBasketItem>) {
      if (action.payload) {
        if (
          !state.Items.find((item) => {
            return item.id === action.payload.id;
          })
        ) {
          state.Items.push(action.payload);
          state.Items = orderBy(state.Items, ["title"], ["asc"]);
        }
      }
    },
    deleteBasketItem(state, action: PayloadAction<number>) {
      if (state.Items && state.Items.length > 0) {
        state.Items.filter((item) => {
          return item.id !== action.payload;
        });
        state.Items = orderBy(state.Items, ["title"], ["asc"]);
      }
    },
  },
});

export const { deleteBasketItem, addNewBasketItem, updateBasketUserId } =
  eBasketSlice.actions;

export default eBasketSlice.reducer;
