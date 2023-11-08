import { CartItemModel } from "../../../interfaces";
import OrderSummaryProps from "./OrderSummaryProps";

function OrderSummary({ data, userInput }: OrderSummaryProps) {
  return (
    <div>
      <h3 className="text-success">Order Summary</h3>
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
                    {(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}
                  </p>
                </div>
              );
            })}
            <hr />
            <h4 className="text-danger" style={{ textAlign: "right" }}>
              ${data.cartTotal}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
