import { OrderStatuses } from "../utility/constants";
import OrderDetailsModel from "./OrderDetailsModel";

export default interface OrderHeaderModel {
  id?: string;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  userId: string;
  orderTotal: number;
  orderDate: Date;
  stripePaymentIntentId: string;
  status: OrderStatuses;
  totalItems: number;
  orderDetails: OrderDetailsModel[];
}
