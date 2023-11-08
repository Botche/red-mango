import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { Header, Footer } from "../components/layout";
import {
  AccessDenied,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
} from "../pages";
import { useGetShoppingCartQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import { UserModel } from "../interfaces";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import { RootState } from "../storage/redux/store";

function App() {
  const dispatch = useDispatch();
  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const token = localStorage.getItem("token")!;
    if (token) {
      const { fullName, email, id, role }: UserModel = jwtDecode(token);
      dispatch(setLoggedInUser({ fullName, email, id, role }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && userData.id) {
      dispatch(setShoppingCart(data?.result?.cartItems));
    }
  }, [data, isLoading, dispatch, userData]);

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

          <Route path="/authentication" element={<AuthenticationTest />} />
          <Route path="/authorization" element={<AuthenticationTestAdmin />} />
          <Route path="/accessDenied" element={<AccessDenied />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
