import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApiResponse, MenuItemModel, UserModel } from "../../../types";
import { useUpdateShoppingCartMutation } from "../../../apis/shoppingCartApi";
import { MiniLoader } from "../common";
import { toastNotify } from "../../../helpers";
import { RootState } from "../../../storage/redux/store";
import { MESSAGES, ROUTES } from "../../../utility/constants";

type MenuItemCardProps = {
  menuItem: MenuItemModel;
};

function MenuItemCard(props: MenuItemCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const navigate = useNavigate();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleAddToCart = async (menuItemId: string) => {
    if (!userData.id) {
      navigate(ROUTES.login);
      return;
    }

    setIsAddingToCart(true);

    const response: ApiResponse = await updateShoppingCart({
      menuItemId,
      updateQuantityBy: 1,
      userId: userData.id,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify(MESSAGES.addedItemToCartSuccessfully);
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link
              to={ROUTES.menuItemDetails.replace(
                ":menuItemId",
                props.menuItem.id
              )}
            >
              <img
                src={props.menuItem.imageUrl}
                style={{ borderRadius: "50%" }}
                alt={props.menuItem.name}
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>

          {props.menuItem.specialTag &&
            props.menuItem.specialTag.length > 0 && (
              <i
                className="bi bi-star btn btn-success"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  outline: "none !important",
                  cursor: "pointer",
                }}
              >
                &nbsp; {props.menuItem.specialTag}
              </i>
            )}

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleAddToCart(props.menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={ROUTES.menuItemDetails.replace(
                  ":menuItemId",
                  props.menuItem.id
                )}
                className="text-decoration-none text-success"
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
