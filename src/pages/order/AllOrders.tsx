import { withAdminAuth } from "../../hoc";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";
import { Fragment } from "react";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
        <h1 className="text-success">Orders List</h1>

        <div className="d-flex" style={{ width: "40%" }}>
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Search Name, Email or Phone"
          />
          <select name="" className="form-select w-50 mx-2">
            <option value="All">All</option>
          </select>

          <button className="btn btn-outline-success">Filter</button>
        </div>
      </div>
      <OrderList orderData={data.result} />
    </Fragment>
  );
}

export default withAdminAuth(AllOrders);
