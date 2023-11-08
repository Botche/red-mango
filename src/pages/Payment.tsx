import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../components/page/payment";
import { OrderSummary } from "../components/page/order";

console.log(process.env);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY!);

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const options = {
    clientSecret: apiResult.clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="d-flex justify-content-center">
        <div className="container m-5 p-5 row">
          <div className="col-md-7">
            <OrderSummary />
          </div>
          <div className="col-md-5">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
