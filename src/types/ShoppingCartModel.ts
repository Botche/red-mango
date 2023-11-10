import CartItemModel from "./CartItemModel";

type ShoppingCartModel = {
  id?: string;
  userId?: string;
  cartTotal?: number;
  cartItems: CartItemModel[];
  stripePaymentIntentId?: any;
  clientSecret?: any;
};

export default ShoppingCartModel;
