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
    },
    updateUserAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { clearUserData, updateUserAuth } = userSlice.actions;

export default userSlice.reducer;
