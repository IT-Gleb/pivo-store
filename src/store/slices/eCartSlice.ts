import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";
import { PivoDb } from "../../libs";

export type TBasketItem = {
  id: number;
  timeAdd: number;
  title: string;
  imgPath: string;
  count: number;
  price: number | undefined;
  stars: number | undefined;
  isSelected: boolean;
};

export type TBasketItemNewCount = {
  id: number;
  newCount: number;
};

export type TBasketItemSelected = {
  id: number;
  newSelected: boolean;
};

export interface IBasket {
  userId: string;
  error: string;
  Items: TBasketItem[];
}

const stateInit: IBasket = {
  userId: "",
  error: "",
  Items: [],
};

export const getCartDataDb = createAsyncThunk<
  TBasketItem[], //Что возвращаем из функции
  void, //Что передаем как параметр
  { rejectValue: string; state: { eBasket: IBasket } } //Конфигурация
>(
  "eBasketSlice/getCartDataDb",
  async function (_, { rejectWithValue, getState }) {
    const result = await PivoDb.getItem(getState().eBasket.userId).catch(
      (e) => {
        return rejectWithValue("Ошибка. eCart. Не могу получить данные...");
      }
    );
    return result as TBasketItem[];
  }
);

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const eBasketSlice = createSlice({
  name: "eBasket",
  initialState: stateInit,
  reducers: {
    updateBasketUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    clearBasket(state) {
      state.Items = [];
      state.userId = "";
      state.error = "";
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
          if (state.userId.trim().length > 0)
            PivoDb.setItem(state.userId, state.Items);
        }
      }
    },
    deleteBasketItem(state, action: PayloadAction<number>) {
      // console.log("Удаляю - ", action.payload);
      state.Items = state.Items.filter((item: TBasketItem) => {
        return item.id !== action.payload;
      });
      // console.log(state.Items.length);
      state.Items = orderBy(state.Items, ["title"], ["asc"]);
      if (state.userId.trim().length > 0) {
        try {
          state.error = "";
          PivoDb.setItem(state.userId, state.Items);
        } catch (e) {
          state.error = e as string;
          console.log(e);
        }
      }
    },
    deleteBasketSelected(state) {
      if (state.Items.length > 0) {
        state.Items = state.Items.filter((item) => {
          return item.isSelected === false;
        });
      }
      state.Items = orderBy(state.Items, ["title"], ["asc"]);
      if (state.userId.trim().length > 0) {
        try {
          state.error = "";
          PivoDb.setItem(state.userId, state.Items);
        } catch (e) {
          state.error = e as string;
          console.log(e);
        }
      }
    },
    updateBasketItemCount(state, action: PayloadAction<TBasketItemNewCount>) {
      if (state.Items.length > 0) {
        let tmpId: number = action.payload.id;
        for (let i: number = 0; i < state.Items.length; i++) {
          if (state.Items[i].id === tmpId) {
            state.Items[i].count = action.payload.newCount;
            break;
          }
        }
      }
    },
    updateBasketItemSelected(
      state,
      action: PayloadAction<TBasketItemSelected>
    ) {
      if (state.Items.length > 0) {
        let tmpId: number = action.payload.id;
        for (let i: number = 0; i < state.Items.length; i++) {
          if (state.Items[i].id === tmpId) {
            state.Items[i].isSelected = action.payload.newSelected;
            break;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartDataDb.fulfilled, (state, action) => {
        if (action.payload) {
          state.error = "";
          state.Items = action.payload;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.Items = [];
        state.error = action.payload;
        console.log(state.error);
      });
  },
});

export const {
  deleteBasketItem,
  addNewBasketItem,
  updateBasketUserId,
  clearBasket,
  updateBasketItemCount,
  updateBasketItemSelected,
  deleteBasketSelected,
} = eBasketSlice.actions;

export default eBasketSlice.reducer;
