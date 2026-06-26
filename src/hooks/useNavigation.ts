import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate(ROUTES.home),
    goLogin: () => navigate(ROUTES.login),
    goCart: () => navigate(ROUTES.cart),
    goOrders: () => navigate(ROUTES.orders),
  };
};