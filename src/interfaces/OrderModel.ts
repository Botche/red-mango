import { OrderStatuses } from "../utility/constants";
import OrderDetailsModel from "./OrderDetailsModel";

export default interface OrderModel {
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  userId: string;
  orderTota: number;
  stripePaymentIntentId: string;
  status: OrderStatuses;
  totalItems: number;
  orderDetails: OrderDetailsModel[];
}
