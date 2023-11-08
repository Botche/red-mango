import { withAdminAuth } from "../../hoc";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");

  if (isLoading) {
    return <MainLoader />;
  }

  return <OrderList orderData={data.result} />;
}

export default withAdminAuth(AllOrders);
