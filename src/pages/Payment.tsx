import { useLocation } from "react-router-dom";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  return <div>Payment</div>;
}

export default Payment;
