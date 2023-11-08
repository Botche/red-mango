import { OrderStatuses } from "../utility/constants";
import OrderDetailsModel from "./OrderDetailsModel";

export default interface OrderHeaderModel {
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  userId: string;
  orderTotal: number;
  stripePaymentIntentId: string;
  status: OrderStatuses;
  totalItems: number;
  orderDetails: OrderDetailsModel[];
}
