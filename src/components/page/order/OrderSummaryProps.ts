import { ShoppingCartModel } from "../../../interfaces";

export default interface OrderSummaryProps {
  data: {
    id: string;
    cartItems: ShoppingCartModel[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
