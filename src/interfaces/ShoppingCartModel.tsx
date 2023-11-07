import CartItemModel from "./CartItemModel";

export default interface ShoppingCartModel {
  id: string;
  userId: string;
  cartTotal: number;
  cartItems: CartItemModel[];
  stripePaymentIntentId?: any;
  clientSecret?: any;
}
