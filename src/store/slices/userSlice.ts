import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { type IUser } from "../../types";

import { checkerAuth, PivoDb, nameDb } from "../../libs";
import PivoNotification from "../../libs/Notification/notification";

export const getStorageData = createAsyncThunk<IUser, void, {}>(
  "userSlice/getStorageData",
  async () => {
    const response = await PivoDb.getItem(nameDb);
    //console.log(response);
    return response as IUser;
  }
);

const initialState: IUser = {
  isAuth: false,
  Name: "",
  email: "",
  passWord: "",
  id: "",
  eCartId: "",
  ordersId: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearUserData(state) {
      state.email = "";
      state.passWord = "";
      state.id = "";
      state.isAuth = false;
      state.Name = "";
      state.eCartId = "";
      state.ordersId = "";
      PivoDb.clear();
    },
    updateUserAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    updateUserData(state, action: PayloadAction<IUser>) {
      state.id = action.payload.id;
      state.Name = action.payload.Name;
      state.email = action.payload.email;
      state.passWord = action.payload.passWord;
      state.isAuth = action.payload.isAuth;
      state.eCartId = action.payload.eCartId;
      state.ordersId = action.payload.ordersId;
      PivoDb.setItem(nameDb, {
        Name: state.Name,
        id: state.id,
        email: state.email,
        passWord: state.passWord,
        isAuth: checkerAuth(state),
        eCartId: state.eCartId,
        ordersId: state.ordersId,
      })
        .then((value) => {
          // console.log(value);
          PivoNotification(
            `Данные пользователя - ${action.payload.Name} - успешно сохранены...`,
            ["has-background-success", "has-text-light"]
          );
        })
        .catch((err) => {
          console.log("Ошибка при записи данных:", err);
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStorageData.fulfilled, (state, action) => {
      if (action.payload) {
        state.Name = action.payload.Name;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.isAuth = action.payload.isAuth;
        state.passWord = action.payload.passWord;
        state.eCartId = action.payload.eCartId;
        state.ordersId = action.payload.ordersId;
      }

      // console.log(state);
    });
  },
});

export const { clearUserData, updateUserAuth, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;
