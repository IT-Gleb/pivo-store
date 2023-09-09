import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

// import sReducer from "./slices/pivo1Slice";
import { pivoApi } from "./punkApi/pivo.punk.api";
import { itemsSlice } from "./slices/pivo1Slice";
import { FilterSlice } from "./slices/filterSlice";

export const pivoStore = configureStore({
  reducer: {
    [pivoApi.reducerPath]: pivoApi.reducer,
    pivoItems: itemsSlice.reducer,
    filterD: FilterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pivoApi.middleware),
});

export default pivoStore;

//Export Types
export type PivoStoreState = ReturnType<typeof pivoStore.getState>;

//Export dispatch
export type pivoDispatch = typeof pivoStore.dispatch;

setupListeners(pivoStore.dispatch);
