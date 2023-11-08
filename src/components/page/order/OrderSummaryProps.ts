import { ShoppingCartModel } from "../../../interfaces";
import { OrderStatuses } from "../../../utility/constants";

export default interface OrderSummaryProps {
  data: {
    id: string;
    cartItems: ShoppingCartModel[];
    cartTotal: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status: OrderStatuses;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
