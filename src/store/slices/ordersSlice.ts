import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { type IOrder } from "./currOrderSlice";
import orderBy from "lodash/orderBy";
import { PivoDb } from "../../libs";

export const defaultOnPage: number = 5;

export interface IOrders {
  orderItems: IOrder[];
  userId: string;
  onPage: number;
}

const initialData: IOrders = {
  userId: "",
  onPage: defaultOnPage,
  orderItems: [],
};

export const get_OrdersFromDb = createAsyncThunk<
  IOrder[], //Получаемое значение
  string, //Передаваемое значение (Ничего)
  { rejectValue: string } //Конфигурация>
>(
  "allOrdersSlice/get_OrdersFromDb",
  async function (paramId, { rejectWithValue }) {
    const result = await PivoDb.getItem(paramId).catch((e) => {
      return rejectWithValue("Ошибка. all Orders. Не могу получить данные...");
    });
    return result as IOrder[];
  }
);

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const OrdersSlice = createSlice({
  name: "allOrdersSlice",
  initialState: initialData,
  reducers: {
    updateOrdersUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
      //console.log(state.userId);
    },
    clearOrdersStore(state) {
      state.orderItems = [];
      state.userId = "";
      state.onPage = defaultOnPage;
    },
    updateOrdersOnPage(state, action: PayloadAction<number>) {
      state.onPage = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(get_OrdersFromDb.fulfilled, (state, action) => {
        // console.log("loaded...");
        if (action.payload) {
          state.orderItems = orderBy(action.payload, ["orderDate"], ["desc"]);
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.orderItems = [];
        state.userId = "";
        console.log(action.payload);
      });
  },
});

export const {
  updateOrdersUserId,
  clearOrdersStore,
  addNew_Orders_Item,
  updateOrdersOnPage,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;
