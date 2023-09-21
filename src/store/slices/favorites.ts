import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { type IPivoItem } from "../../types";
import { validate as UUID5validate } from "uuid";
import orderBy from "lodash/orderBy";
import { PivoDb } from "../../libs";

export const getFavoriteData = createAsyncThunk<
  IPivoItem[], //Что возвращаем
  void, //Что передаем в качестве параметра
  { rejectValue: string; state: { favorites: IFavorites } } //Конфигурация
>(
  "favoriteSlice/getFavoriteData",
  //  async function (pUserId, { rejectWithValue, getState }) {
  async function (_, { rejectWithValue, getState }) {
    const result = await PivoDb.getItem(getState().favorites.userId).catch(
      (e) => {
        return rejectWithValue("Избранное. Ошибка при получении данных...");
      }
    );
    return result as IPivoItem[];
  }
);

export interface IFavorites {
  userId: string;
  items: IPivoItem[];
  error: string;
  currentPage: number;
}

const initState: IFavorites = {
  userId: "",
  items: [],
  error: "",
  currentPage: 1,
};

export const FavoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState: initState,
  reducers: {
    addNewFavItem(state, action: PayloadAction<IPivoItem>) {
      if (action.payload) {
        if (!state.items.find((item) => item.id === action.payload.id)) {
          state.items.push(action.payload);
          state.items = orderBy(state.items, ["_price", "abv"], ["desc"]);
          //----------Добавить в базу--------------
          try {
            state.error = "";
            PivoDb.setItem(state.userId, state.items);
          } catch (e) {
            state.error = e as string;
            console.log(state.error);
          }
        }
      }
    },
    setFavUserId(state, action: PayloadAction<string>) {
      if (UUID5validate(action.payload)) {
        state.userId = action.payload;
      } else {
        state.userId = "";
      }
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      if (state.currentPage < 1) {
        state.currentPage = 1;
      }
    },
    deleteFromFav(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item: IPivoItem) => {
        return item.id !== action.payload;
      });
      state.items = orderBy(state.items, ["_price", "abv"], ["desc"]);
      //-------------Изменить базу-------
      try {
        state.error = "";
        PivoDb.setItem(state.userId, state.items);
      } catch (e) {
        state.error = e as string;
        console.log(state.error);
      }
    },
    clearFavorites(state) {
      state.items = [];
      state.userId = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteData.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = orderBy(action.payload, ["_price", "abv"], ["desc"]);
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.items = [];
        state.error = action.payload;
        console.log(state.error);
      });
  },
});

export const {
  addNewFavItem,
  setFavUserId,
  deleteFromFav,
  clearFavorites,
  setCurrentPage,
} = FavoriteSlice.actions;

export default FavoriteSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
