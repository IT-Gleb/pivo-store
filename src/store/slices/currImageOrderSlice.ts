import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TImgString = {
  Image64: string;
};

const initData: TImgString = {
  Image64: "",
};

export const currImageOrderSlice = createSlice({
  name: "currImage",
  initialState: initData,
  reducers: {
    updateImage64(state, action: PayloadAction<string>) {
      if (action.payload) {
        // console.log(action.payload);
        state.Image64 = action.payload;
      }
    },
  },
});

export const { updateImage64 } = currImageOrderSlice.actions;

export default currImageOrderSlice.reducer;
