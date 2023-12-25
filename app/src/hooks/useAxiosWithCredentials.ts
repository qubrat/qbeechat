import { axiosWithCredentials } from "../apis/config/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAccessToken } from "../stores/authStore";

const useAxiosWithCredentials = () => {
	const refresh = useRefreshToken();
	const accessToken = useAccessToken();

	useEffect(() => {
		const requestIntercept = axiosWithCredentials.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosWithCredentials.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error?.config;
				if (error.response.status === 401 && error.response.data.message.includes("expired") && !originalRequest?.sent) {
					originalRequest.sent = true;
					const newAccessToken = await refresh();
					originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
					return axiosWithCredentials(originalRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosWithCredentials.interceptors.response.eject(responseIntercept);
			axiosWithCredentials.interceptors.request.eject(requestIntercept);
		};
	}, [accessToken, refresh]);

	return axiosWithCredentials;
};

export default useAxiosWithCredentials;
