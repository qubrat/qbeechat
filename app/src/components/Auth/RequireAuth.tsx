import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUserData } from "../../stores/authStore";

const RequireAuth = () => {
	const user = useUserData();
	const location = useLocation();

	return user?.id ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
