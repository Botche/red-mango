import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toastNotify } from "../../../helpers";
import OrderSummaryProps from "../order/OrderSummaryProps";
import {
  ApiResponse,
  CartItemModel,
  OrderDetailsModel,
  OrderHeaderModel,
} from "../../../interfaces";
import { useCreateOrderMutation } from "../../../apis/orderApi";
import { OrderStatuses } from "../../../utility/constants";
import { MiniLoader } from "../common";

function CheckoutForm({ data, userInput }: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();

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
      let grandTotal = 0;
      let totalItems = 0;

      const orderDetails: OrderDetailsModel[] = [];
      data.cartItems.forEach((item: CartItemModel) => {
        const tempOrderDetails: OrderDetailsModel = {
          itemName: item.menuItem?.name!,
          menuItemId: item.menuItemId!,
          price: item.menuItem?.price!,
          quantity: item.quantity!,
        };

        orderDetails.push(tempOrderDetails);

        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });

      const orderStatus =
        result.paymentIntent.status === "succeeded"
          ? OrderStatuses.CONFIRMED
          : OrderStatuses.PENDING;
      const orderHeader: OrderHeaderModel = {
        orderDate: new Date(),
        orderTotal: grandTotal,
        totalItems: totalItems,
        pickupEmail: userInput.email,
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        status: orderStatus,
        stripePaymentIntentId: data.stripePaymentIntentId!,
        userId: data.userId!,
        orderDetails: orderDetails,
      };

      const response: ApiResponse = await createOrder(orderHeader);
      if (
        response &&
        response.data?.result!.status === OrderStatuses.CONFIRMED
      ) {
        navigate(`/order/orderConfirmed/${response.data.result.id}`);
      } else {
        navigate("/order/failed");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="btn btn-success mt-5 w-100"
        disabled={!stripe || isProcessing}
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Submit"}
        </span>
      </button>
    </form>
  );
}

export default CheckoutForm;
