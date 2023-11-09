import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { withAuth } from "../../hoc";
import { RootState } from "../../storage/redux/store";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";

function MyOrders() {
  const [skipGetAllOrders, setSkipGetAllOrders] = useState(true);
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data: orders } = useGetAllOrdersQuery(
    { userId },
    {
      skip: skipGetAllOrders,
    }
  );

  useEffect(() => {
    if (userId) {
      setSkipGetAllOrders(false);
    }
  }, [userId]);

  if (!orders || !orders.apiResponse.result) {
    return <MainLoader />;
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
        <h1 className="text-success">My Orders</h1>
      </div>
      <OrderList orderData={orders.apiResponse.result} />
    </Fragment>
  );
}

export default withAuth(MyOrders);
