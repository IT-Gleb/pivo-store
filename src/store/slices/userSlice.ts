import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  isAuth: boolean;
  Name: string;
  email: string;
  passWord: string;
  id: string;
}

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
