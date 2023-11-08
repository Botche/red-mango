import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toastNotify } from "../../../helpers";
import OrderSummaryProps from "../order/OrderSummaryProps";
import OrderModel from "../../../interfaces/OrderModel";
import { CartItemModel } from "../../../interfaces";
import OrderDetailsModel from "../../../interfaces/OrderDetailsModel";

function CheckoutForm({ data, userInput }: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toastNotify("An unexpected error occured.", "error");
      setIsProcessing(false);
    } else {

      
      const orderDetails: OrderDetailsModel[] = [];
      data.cartItems.forEach((item: CartItemModel) => {
        const tempOrderDetails: OrderDetailsModel = {
          itemName: item.menuItem?.name!,
          menuItemId: item.menuItemId!,
          price: item.menuItem?.price!,
          quantity: item.quantity!,
        };

        orderDetails.push(tempOrderDetails);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  );
}

export default CheckoutForm;
