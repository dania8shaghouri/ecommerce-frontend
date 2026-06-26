import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import ResultState from "../components/ui/ResultState";

const OrderErrorPage = () => {
  const navigate = useNavigate();

  return (
    <ResultState
      icon={FiX}
      title="Something went wrong while placing your order."
      buttonText="Try Again"
      onClick={() => navigate("/cart")}
      color="red"
    />
  );
};

export default OrderErrorPage;