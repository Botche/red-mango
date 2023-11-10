import { useNavigate } from "react-router-dom";
import OrderListProps from "./OrderListType";
import { OrderHeaderModel } from "../../../types";
import { getStatusColor } from "../../../helpers";
import { ROUTES } from "../../../utility/constants";

function OrderList({ orderData }: OrderListProps) {
  const navigate = useNavigate();

  return (
    <div className="table px-5">
      <div className="p-2">
        <div className="row border">
          <div className="col-1">ID</div>
          <div className="col-3">Name</div>
          <div className="col-2">Phone</div>
          <div className="col-1">Total</div>
          <div className="col-1">Items</div>
          <div className="col-1">Date</div>
          <div className="col-2">Status</div>
          <div className="col-1"></div>
        </div>
        {orderData.map((orderHeader: OrderHeaderModel, index: number) => {
          const badgeColor = getStatusColor(orderHeader.status);

          return (
            <div key={index} className="row border">
              <div className="col-1">{orderHeader.itemNumber}</div>
              <div className="col-3">{orderHeader.pickupName}</div>
              <div className="col-2">{orderHeader.pickupPhoneNumber}</div>
              <div className="col-1">${orderHeader.orderTotal.toFixed(2)}</div>
              <div className="col-1">{orderHeader.totalItems}</div>
              <div className="col-1">
                {new Date(orderHeader.orderDate).toLocaleDateString("en-US")}
              </div>
              <div className="col-2">
                <span className={`badge bg-${badgeColor}`}>
                  {orderHeader.status}
                </span>
              </div>
              <div className="col-1">
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(
                      ROUTES.orderDetails.replace(":id", orderHeader.id!)
                    )
                  }
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderList;
