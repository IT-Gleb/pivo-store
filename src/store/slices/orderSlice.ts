import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";
import { PivoDb } from "../../libs";

export type TOrderItem = {
  id: number;
  name: string;
  price: number;
  count: number;
};

export type TOrder = {
  Items: TOrderItem[];
  totalPrice: number;
};

export interface IOrder {
  userId: string;
  error: string;
  Orders: TOrder[];
}

const InitOrderState: IOrder = {
  Orders: [],
  userId: "",
  error: "",
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: InitOrderState,
  reducers: {
    updateOrderUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    addNewOrder(state, action: PayloadAction<TOrderItem>) {
      if (action.payload) {
      }
    },
  },
});

export const { updateOrderUserId, addNewOrder } = orderSlice.actions;

export default orderSlice.reducer;
