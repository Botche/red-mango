import { PaymentElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  return (
    <form>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  );
}

export default CheckoutForm;
