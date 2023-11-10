import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMenuItemByIdQuery } from "../apis/menuItemApi";
import { useUpdateShoppingCartMutation } from "../apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../components/page/common";
import { ApiResponse, UserModel } from "../types";
import { toastNotify } from "../helpers";
import { RootState } from "../storage/redux/store";
import { ROUTES } from "../utility/constants";

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();
  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;

    if (newQuantity <= 0) {
      newQuantity = 1;
    }

    setQuantity(newQuantity);
  };

  const handleAddToCart = async (menuItemId: string) => {
    if (!userData.id) {
      navigate(ROUTES.login);
      return;
    }

    setIsAddingToCart(true);

    const response: ApiResponse = await updateShoppingCart({
      menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }

    setIsAddingToCart(false);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{data.result.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {data.result.description}
          </p>
          <span className="h3">${data.result.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => handleQuantity(-1)}
            ></i>
            <span className="h3 mt-3 px-3">{quantity}</span>
            <i
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => handleQuantity(1)}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              {isAddingToCart ? (
                <button disabled className="btn btn-success form-control">
                  <MiniLoader />
                </button>
              ) : (
                <button
                  className="btn btn-success form-control"
                  onClick={() => handleAddToCart(data.result.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>

            <div className="col-5 ">
              <button
                className="btn btn-secondary form-control"
                onClick={() => navigate(ROUTES.home)}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={data.result.imageUrl}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt={data.result.name}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;
