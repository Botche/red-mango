import { ShoppingCartModel } from "../../../types";
import { OrderStatuses } from "../../../utility/enums";

type OrderSummaryProps = {
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
};

export default OrderSummaryProps;
