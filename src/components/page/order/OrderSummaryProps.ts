import { ShoppingCartModel } from "../../../interfaces";

export default interface OrderSummaryProps {
  data: {
    id: string;
    cartItems: ShoppingCartModel[];
    cartTotal: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status: string;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
