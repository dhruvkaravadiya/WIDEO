import { useDispatch } from "react-redux";
import { logoutUser } from "../../api/auth"
import { logout } from "../../features/authSlice"

async function useLogout(){
      const dispatch = useDispatch();
      try {
            await logoutUser();
            dispatch(logout());
            localStorage.removeItem("userData");
      } catch (error) {
            console.error("Logout error:", error);
      }
}

module.exports={
      useLogout
}