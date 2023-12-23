import axios from "../api/axios";
import { getActions } from "../stores/authStore";

const useRefreshToken = () => {
	const { setAuth } = getActions();

	return async () => {
		try {
			const response = await axios.get("/auth/refresh", {
				withCredentials: true,
			});
			setAuth(response.data.accessToken);
		} catch (e) {
			console.error(e);
		}
	};
};

export default useRefreshToken;
