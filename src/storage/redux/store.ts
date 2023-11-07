import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { menuItemApi, shoppingCartApi } from "../../apis";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
