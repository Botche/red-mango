import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { Header, Footer } from "../components/layout";
import {
  AccessDenied,
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Payment,
  Register,
  ShoppingCart,
} from "../pages";
import {
  useLazyGetShoppingCartQuery,
} from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import { UserModel } from "../interfaces";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import { RootState } from "../storage/redux/store";

function App() {
  const dispatch = useDispatch();
  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [getShoppingCart, { isLoading, isSuccess, currentData }] =
    useLazyGetShoppingCartQuery();

  useEffect(() => {
    const token = localStorage.getItem("token")!;
    if (token) {
      const { fullName, email, id, role }: UserModel = jwtDecode(token);
      dispatch(setLoggedInUser({ fullName, email, id, role }));
      getShoppingCart(id);
    }
  }, [dispatch, getShoppingCart, userData]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      dispatch(setShoppingCart(currentData.result.cartItems));
    }
  }, [isLoading, isSuccess, currentData, dispatch]);

  return (
    <div className="">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/accessDenied" element={<AccessDenied />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
