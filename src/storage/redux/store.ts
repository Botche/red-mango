import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import { menuItemReducer } from "./menuItemSlics";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
