import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const navigate = useNavigate();
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

export const checkLogin = (truePath) => {
      if (isLoggedIn) {
            navigate(truePath);
      }
      else {
            navigate('/login');
            toast.info("Login to Access this feature");
      }
}
