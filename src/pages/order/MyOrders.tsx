import { useSelector } from "react-redux";
import { withAuth } from "../../hoc";
import { RootState } from "../../storage/redux/store";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";
import { useEffect, useState } from "react";

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

  return <OrderList orderData={orders.result} />;
}

export default withAuth(MyOrders);
