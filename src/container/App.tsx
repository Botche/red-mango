import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { Header, Footer } from "../components/layout";
import {
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
} from "../pages";
import { useEffect } from "react";
import { useGetShoppingCartQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import { UserModel } from "../interfaces";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetShoppingCartQuery(
    "4b6624b9-775a-4e27-82ad-40939ee612f5"
  );

  useEffect(() => {
    const token = localStorage.getItem("token")!;
    const { fullName, email, id, role }: UserModel = jwtDecode(token);
    dispatch(setLoggedInUser({ fullName, email, id, role }));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data, isLoading, dispatch]);

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
