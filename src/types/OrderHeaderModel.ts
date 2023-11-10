import { OrderStatuses } from "../utility/constants";
import OrderDetailsModel from "./OrderDetailsModel";

type OrderHeaderModel = {
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
};

export default OrderHeaderModel;
