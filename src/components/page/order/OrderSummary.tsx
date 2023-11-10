import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStatusColor } from "../../../helpers";
import { CartItemModel } from "../../../types";
import OrderSummaryProps from "./OrderSummaryProps";
import { OrderStatuses, Roles } from "../../../utility/constants";
import { RootState } from "../../../storage/redux/store";
import { useState } from "react";
import { useUpdateOrderDetailsMutation } from "../../../apis/orderApi";
import { MainLoader } from "../common";

function OrderSummary({ data, userInput }: OrderSummaryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const badgeTypeColor = getStatusColor(data.status);
  const [updateOrderHeader] = useUpdateOrderDetailsMutation();

  let nextStatus: any = {};
  switch (data.status) {
    case OrderStatuses.CONFIRMED:
      nextStatus = {
        color: "info",
        value: OrderStatuses.BEING_COOKED,
      };
      break;
    case OrderStatuses.BEING_COOKED:
      nextStatus = {
        color: "warning",
        value: OrderStatuses.READY_FOR_PICKUP,
      };
      break;
    case OrderStatuses.READY_FOR_PICKUP:
      nextStatus = {
        color: "success",
        value: OrderStatuses.COMPLETED,
      };
      break;
  }

  const handleCancel = async () => {
    setIsLoading(true);

    await updateOrderHeader({
      id: data.id,
      status: OrderStatuses.CANCELLED,
    });

    setIsLoading(false);
  };

  const handleNextStatus = async () => {
    setIsLoading(true);

    await updateOrderHeader({
      id: data.id,
      status: nextStatus.value,
    });

    setIsLoading(false);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-success">Order Summary</h3>
        <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
          {data.status}
        </span>
      </div>
      <div className="mt-3">
        <div className="border py-3 px-2">Name: {userInput.name}</div>
        <div className="border py-3 px-2">Email: {userInput.email}</div>
        <div className="border py-3 px-2">Phone: {userInput.phoneNumber}</div>
        <div className="border py-3 px-2">
          <h4 className="text-success">Menu Items</h4>
          <div className="p-3">
            {data.cartItems.map((cartItem: CartItemModel, index: number) => {
              return (
                <div key={index} className="d-flex">
                  <div className="d-flex w-100 justify-content-between">
                    <p>{cartItem.menuItem?.name}</p>
                    <p>
                      ${cartItem.menuItem?.price} x {cartItem.quantity} =
                    </p>
                  </div>
                  <p style={{ width: "70px", textAlign: "right" }}>
                    $
                    {((cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)).toFixed(2)}
                  </p>
                </div>
              );
            })}
            <hr />
            <h4 className="text-danger" style={{ textAlign: "right" }}>
              ${data.cartTotal.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/order/myOrders")}
        >
          Go back to Orders
        </button>

        {userData.role && userData.role === Roles.ADMIN && (
          <div>
            {data.status !== OrderStatuses.CANCELLED &&
              data.status !== OrderStatuses.COMPLETED && (
                <button className="btn btn-danger mx-1" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            <button
              className={`btn btn-${nextStatus.color} mx-2`}
              onClick={handleNextStatus}
            >
              {nextStatus.value}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
