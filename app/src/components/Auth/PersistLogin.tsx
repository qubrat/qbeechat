import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAccessToken } from "../../stores/authStore";
import Spinner from "../Spinner";

const PersistLogin = () => {
	const [loading, setLoading] = useState(true);
	const refresh = useRefreshToken();
	const accessToken = useAccessToken();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		!accessToken ? verifyRefreshToken() : setLoading(false);
	}, []);

	return <>{loading ? <Spinner size="large" color="grey" /> : <Outlet />}</>;
};

export default PersistLogin;
