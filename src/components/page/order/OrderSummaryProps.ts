import { ShoppingCartModel } from "../../../interfaces";

export default interface OrderSummaryProps {
  data: {
    id: string;
    cartItem: ShoppingCartModel[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phone: string;
  };
}
