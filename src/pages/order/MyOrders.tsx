import { useSelector } from "react-redux";
import { withAuth } from "../../hoc";
import { RootState } from "../../storage/redux/store";
import { useLazyGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";
import { useEffect, useState } from "react";
import { OrderHeaderModel } from "../../interfaces";

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const [getAllOrders] = useLazyGetAllOrdersQuery();
  const [result, setResult] = useState<OrderHeaderModel[]>([]);

  useEffect(() => {
    if (userId) {
      getAllOrders(userId).then((response) => setResult(response.data.result));
    }
  }, [getAllOrders, userId]);

  if (!result) {
    return <MainLoader />;
  }

  return <OrderList orderData={result} />;
}

export default withAuth(MyOrders);
