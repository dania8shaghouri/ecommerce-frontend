import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import ResultState from "../components/ui/ResultState";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <ResultState
      icon={FiCheck}
      title="Your order has been successfully placed."
      buttonText="Back to Home"
      onClick={() => navigate("/")}
      color="green"
    />
  );
};

export default SuccessPage;