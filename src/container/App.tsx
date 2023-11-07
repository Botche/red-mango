import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Header, Footer } from "../components/layout";
import { Home, MenuItemDetails, NotFound } from "../pages";
import { useEffect } from "react";
import { useGetShoppingCartQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import { MainLoader } from "../components/page/common";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetShoppingCartQuery(
    "4b6624b9-775a-4e27-82ad-40939ee612f5"
  );

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
      console.log(data.result.cartItems);
    }
  }, [data]);

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
