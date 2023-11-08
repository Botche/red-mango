import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../components/page/payment";
import { OrderSummary } from "../components/page/order";

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
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
