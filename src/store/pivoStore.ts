import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

// import sReducer from "./slices/pivo1Slice";
import { pivoApi } from "./punkApi/pivo.punk.api";
import { itemsSlice } from "./slices/pivo1Slice";
import { FilterSlice } from "./slices/filterSlice";
import { SerchSlice } from "./slices/serchSlice";
import { userSlice } from "./slices/userSlice";
import { FavoriteSlice } from "./slices/favorites";
import { eBasketSlice } from "./slices/eCartSlice";
import { currentOrderSlice } from "./slices/currOrderSlice";
import { OrdersSlice } from "./slices/ordersSlice";
import { currImageOrderSlice } from "./slices/currImageOrderSlice";

export const pivoStore = configureStore({
  reducer: {
    [pivoApi.reducerPath]: pivoApi.reducer,
    pivoItems: itemsSlice.reducer,
    filterD: FilterSlice.reducer,
    serchData: SerchSlice.reducer,
    currentUser: userSlice.reducer,
    favorites: FavoriteSlice.reducer,
    eBasket: eBasketSlice.reducer,
    currentOrder: currentOrderSlice.reducer,
    allOrders: OrdersSlice.reducer,
    chartImage: currImageOrderSlice.reducer,
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
