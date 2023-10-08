import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";

export type TOrderItem = {
  id: number;
  name: string;
  priceOne: number;
  price: number;
  count: number;
};

export interface IOrder {
  Items: TOrderItem[];
  totalPrice: number;
  id: string;
  orderDate: number;
  orderNum: string;
}

const InitOrderState: IOrder = {
  Items: [],
  totalPrice: 0,
  id: crypto.randomUUID(),
  orderDate: 0,
  orderNum: "",
};

export const currentOrderSlice = createSlice({
  name: "orderSlice",
  initialState: InitOrderState,
  reducers: {
    updateOrderId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    addNewOrderItem(state, action: PayloadAction<TOrderItem>) {
      if (action.payload) {
        if (
          !state.Items.find((item: TOrderItem) => {
            return item.id === action.payload.id;
          })
        ) {
          state.Items.push(action.payload);
          state.Items = orderBy(state.Items, ["price", ["asc"]]);
          state.totalPrice = state.Items.reduce((acc, curr: TOrderItem) => {
            return (acc += curr.price);
          }, 0);
        }
      }
    },
    deleteOrderItem(state, action: PayloadAction<number>) {
      state.Items = state.Items.filter((item) => {
        return item.id !== action.payload;
      });
      state.Items = orderBy(state.Items, ["price", ["asc"]]);
      state.totalPrice = state.Items.reduce((acc, curr: TOrderItem) => {
        return (acc += curr.price);
      }, 0);
    },
    clearCurrOrder(state) {
      state.Items = [];
      state.totalPrice = 0;
      state.id = crypto.randomUUID();
      state.orderDate = 0;
      state.orderNum = "";
    },
    updateOrderDate(state, action: PayloadAction<number>) {
      state.orderDate = action.payload;
    },
    updateOrderNum(state, action: PayloadAction<string>) {
      state.orderNum = action.payload;
    },
  },
});

export const {
  updateOrderId,
  addNewOrderItem,
  deleteOrderItem,
  clearCurrOrder,
  updateOrderDate,
  updateOrderNum,
} = currentOrderSlice.actions;

export default currentOrderSlice.reducer;
