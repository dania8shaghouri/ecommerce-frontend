import { useSearchParams, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import ResultState from "../components/ui/ResultState";

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  return (
    <ResultState
      icon={FiX}
      title="Payment Cancelled"
      buttonText="Back to Cart"
      onClick={() => navigate("/cart")}
      color="red"
    >
      <p>Your payment was not completed, so no order was placed.</p>
      {orderId && <p className="text-sm text-gray-500">Order No: {orderId}</p>}
    </ResultState>
  );
};

export default PaymentCancelPage;
