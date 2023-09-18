import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type IUser } from "../../types";

const initialState: IUser = {
  isAuth: false,
  Name: "",
  email: "",
  passWord: "",
  id: "",
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
    },
  },
});

export const { clearUserData, updateUserAuth, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;
