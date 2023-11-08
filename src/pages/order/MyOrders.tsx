import React from "react";
import { useSelector } from "react-redux";
import { withAuth } from "../../hoc";
import { RootState } from "../../storage/redux/store";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { MainLoader } from "../../components/page/common";
import { OrderHeaderModel } from "../../interfaces";

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="table p-5">
      <h1 className="text-success">Orders List</h1>
      <div className="p-2">
        <div className="row border">
          <div className="col-1">ID</div>
          <div className="col-3">Name</div>
          <div className="col-2">Phone</div>
          <div className="col-1">Total</div>
          <div className="col-1">Items</div>
          <div className="col-2">Date</div>
          <div className="col-2"></div>
        </div>
        {data.result.map((orderHeader: OrderHeaderModel, index: number) => {
          return (
            <div key={index} className="row border">
              <div className="col-1">{orderHeader.id}</div>
              <div className="col-3">{orderHeader.pickupName}</div>
              <div className="col-2">{orderHeader.pickupPhoneNumber}</div>
              <div className="col-1">${orderHeader.orderTotal.toFixed(2)}</div>
              <div className="col-1">{orderHeader.totalItems}</div>
              <div className="col-2">
                {new Date(orderHeader.orderDate).toLocaleDateString("en-US")}
              </div>
              <div className="col-2">
                <button className="btn btn-success">Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withAuth(MyOrders);
