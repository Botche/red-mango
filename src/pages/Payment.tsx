import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../components/page/payment";

console.log(process.env)
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
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
