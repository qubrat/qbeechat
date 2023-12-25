import useAxiosWithCredentials from "../hooks/useAxiosWithCredentials";

// function delay(time: number) {
// 	return new Promise((resolve) => setTimeout(resolve, time));
// }

export type User = {
	_id: string;
	createdAt: string;
	email: string;
	isAdmin: boolean;
	name: string;
	profilePicture: string;
};

export const useUserAPI = () => {
	const api = useAxiosWithCredentials();

	const getUser = async (id: string) => {
		const response = await api.get(`/users/${id}`);
		return response.data as User;
	};

	const getAllUsers = async (query?: string) => {
		const response = await api.get(`/users${query ? `?search=${query}` : ""}`);
		return response.data as User[];
	};
	return { getUser, getAllUsers };
};
