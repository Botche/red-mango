import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import { menuItemReducer } from "./menuItemSlics";
import { menuItemApi } from "../../apis";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuItemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
