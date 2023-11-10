import { OrderStatuses } from "../utility/enums";

const getStatusColor = (status: OrderStatuses) => {
  let color = "";
  switch (status) {
    case OrderStatuses.CONFIRMED:
      color = "primary";
      break;
    case OrderStatuses.PENDING:
      color = "secondary";
      break;
    case OrderStatuses.CANCELLED:
      color = "danger";
      break;
    case OrderStatuses.COMPLETED:
      color = "success";
      break;
    case OrderStatuses.BEING_COOKED:
      color = "info";
      break;
    case OrderStatuses.READY_FOR_PICKUP:
      color = "warning";
      break;
  }

  return color;
};

export default getStatusColor;
