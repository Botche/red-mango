import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { withAuth } from "../../hoc";
import { RootState } from "../../storage/redux/store";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";
import { OrderStatuses } from "../../utility/constants";

const statusFilterOptions = [
  "All",
  OrderStatuses.CONFIRMED,
  OrderStatuses.BEING_COOKED,
  OrderStatuses.READY_FOR_PICKUP,
  OrderStatuses.CANCELLED,
];

function MyOrders() {
  const [skipGetAllOrders, setSkipGetAllOrders] = useState(true);
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data: orders } = useGetAllOrdersQuery(userId, {
    skip: skipGetAllOrders,
  });

  useEffect(() => {
    if (userId) {
      setSkipGetAllOrders(false);
    }
  }, [userId]);

  if (!orders || !orders.result) {
    return <MainLoader />;
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
        <h1 className="text-success">My Orders</h1>
      </div>
      <OrderList orderData={orders.result} />
    </Fragment>
  );
}

export default withAuth(MyOrders);
