import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type IPivoItem } from "../../types";
import { validate as UUID5validate } from "uuid";
import orderBy from "lodash/orderBy";

export interface IFavorites {
  userId: string;
  items: IPivoItem[];
}

const initState: IFavorites = {
  userId: "",
  items: [],
};

export const FavoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState: initState,
  reducers: {
    addNewFavItem(state, action: PayloadAction<IPivoItem>) {
      if (action.payload) {
        if (!state.items.find((item) => item.id === action.payload.id))
          state.items.push(action.payload);
        state.items = orderBy(state.items, ["_price"], ["desc"]);
      }
    },
    setFavUserId(state, action: PayloadAction<string>) {
      if (UUID5validate(action.payload)) {
        state.userId = action.payload;
      } else {
        state.userId = "";
      }
    },
    deleteFromFav(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item: IPivoItem) => {
        return item.id !== action.payload;
      });
      state.items = orderBy(state.items, ["_price"], ["desc"]);
    },
    clearFavorites(state) {
      state.items = [];
      state.userId = "";
    },
  },
});

export const { addNewFavItem, setFavUserId, deleteFromFav, clearFavorites } =
  FavoriteSlice.actions;

export default FavoriteSlice.reducer;
