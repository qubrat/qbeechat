import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAccessToken, usePersistLogin } from "../../stores/authStore";
import Spinner from "../Spinner";

const PersistLogin = () => {
	const [loading, setLoading] = useState(true);
	const refresh = useRefreshToken();
	const accessToken = useAccessToken();
	const persistLogin = usePersistLogin();

	const render = () => {
		if (!persistLogin) {
			return <Outlet />;
		} else if (loading) {
			return <Spinner size="large" color="grey" />;
		} else {
			return <Outlet />;
		}
	};

	useEffect(() => {
		let mounted = true;
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				mounted && setLoading(false);
			}
		};
		!accessToken && persistLogin ? verifyRefreshToken() : setLoading(false);

		return () => {
			mounted = false;
		};
	}, []);

	return render();
};

export default PersistLogin;
