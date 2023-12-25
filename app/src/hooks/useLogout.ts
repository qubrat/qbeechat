import axios from "../apis/config/axios";
import { getActions } from "../stores/authStore";

const useLogout = () => {
	const { logout } = getActions();
	const signOut = async () => {
		logout();
		try {
			await axios.post("/auth/logout");
		} catch (err) {
			console.error(err);
		}
	};

	return signOut;
};

export default useLogout;
