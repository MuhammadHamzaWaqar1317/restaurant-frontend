import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { roles } from "../../constants/constant";
function PublicRoutes() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  try {
    const { role } = jwtDecode(token);
    console.log(role);
    if (role == roles.user) {
      return <Navigate to={"/user"} />;
    }
    if (role == roles.admin) {
      return <Navigate to={"/admin"} />;
    }
  } catch (error) {
    console.log("Public Route Error", error);
  }
  return <Outlet />;
}

export default PublicRoutes;
