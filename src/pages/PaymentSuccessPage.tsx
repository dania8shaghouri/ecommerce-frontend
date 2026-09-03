import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiCheck, FiClock } from "react-icons/fi";
import { getOrderStatus } from "../services/paymentService";
import ResultState from "../components/ui/ResultState";
import Loading from "../components/ui/Loading";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "paid" | "pending">(
    "loading",
  );

  useEffect(() => {
    if (!orderId) return;

    const checkStatus = async () => {
      try {
        const response = await getOrderStatus(orderId);
        setStatus(response.data.paymentStatus === "paid" ? "paid" : "pending");
      } catch {
        setStatus("pending");
      }
    };

    checkStatus();
  }, [orderId]);

  if (status === "loading") return <Loading />;

  if (status === "paid") {
    return (
      <ResultState
        icon={FiCheck}
        title="Payment Successful 🎉"
        buttonText="Continue Shopping"
        onClick={() => navigate("/shop")}
        color="green"
      >
        <p>Your order has been placed, thank you!</p>
        <p className="text-sm text-gray-500">Order No: {orderId}</p>
      </ResultState>
    );
  }

  return (
    <ResultState
      icon={FiClock}
      title="Confirming Payment"
      buttonText="Refresh"
      onClick={() => window.location.reload()}
      color="green"
    >
      <p>
        Your payment was processed but our system hasn't confirmed it yet —
        please refresh in a few seconds.
      </p>
    </ResultState>
  );
};

export default PaymentSuccessPage;
