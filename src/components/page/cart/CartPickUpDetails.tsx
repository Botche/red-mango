import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiResponse, CartItemModel, UserModel } from "../../../interfaces";
import { RootState } from "../../../storage/redux/store";
import { inputHelper } from "../../../helpers";
import { MiniLoader } from "../common";
import { useInitiatePaymentMutation } from "../../../apis/paymentApi";

function CartPickUpDetails() {
  const shoppingCartFromStore: CartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems
  );
  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  });
  const [initiatePayment] = useInitiatePaymentMutation();

  let grandTotal = 0;
  let totalItems = 0;

  shoppingCartFromStore?.forEach((cartItem: CartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
  });

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  };

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { data }: ApiResponse = await initiatePayment(userData.id);
    navigate("/payment", {
      state: { apiResult: data?.result, userInput },
    });

    setIsLoading(false);
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto" onSubmit={handleSumbit}>
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="name..."
            name="name"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            placeholder="email..."
            name="email"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={isLoading}
        >
          {isLoading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
}

export default CartPickUpDetails;
