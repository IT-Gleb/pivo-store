import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type IOrder } from "./currOrderSlice";
import orderBy from "lodash/orderBy";
import { PivoDb } from "../../libs";

interface IOrders {
  orderItems: IOrder[];
  userId: string;
}

const initialData: IOrders = {
  userId: "",
  orderItems: [],
};

export const OrdersSlice = createSlice({
  name: "allOrders",
  initialState: initialData,
  reducers: {
    updateOrdersUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
      //console.log(state.userId);
    },
    clearOrdersStore(state) {
      state.orderItems = [];
      state.userId = "";
    },
    addNew_Orders_Item(state, action: PayloadAction<IOrder>) {
      let tmpId = action.payload.id;
      if (
        !state.orderItems.find((item: IOrder) => {
          return item.id === tmpId;
        })
      ) {
        state.orderItems.push(action.payload);
        state.orderItems = orderBy(state.orderItems, ["orderDate"], ["desc"]);
        if (state.userId.trim().length > 0)
          try {
            PivoDb.setItem(state.userId, state.orderItems);
          } catch (err) {
            console.log("Ошибка записи в базу: ", err);
          }
        //console.log(state.orderItems);
      }
    },
  },
});

export const { updateOrdersUserId, clearOrdersStore, addNew_Orders_Item } =
  OrdersSlice.actions;

export default OrdersSlice.reducer;
