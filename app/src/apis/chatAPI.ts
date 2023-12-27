import useAxiosWithCredentials from "../hooks/useAxiosWithCredentials";
import { User } from "./userAPI";

export const useChatAPI = () => {
	const api = useAxiosWithCredentials();

	type Chat = {
		_id: string;
		chatName: string;
		isGroupChat: boolean;
		users: User[];
		lastMessage?: string;
		picture: string;
		createdAt: string;
		updatedAt: string;
	};

	const accessChat = async (id: string) => {
		const response = await api.post(`/chats`, { userId: id });
		return response.data as Chat;
	};

	const getAllUserChats = async () => {
		const response = await api.get(`/chats`);
		return response.data as Chat[];
	};

	const createGroupChat = async (name: string, users: string[], user: string) => {
		const response = await api.post(`/chats/group`, { name, users, user });
		return response.data;
	};

	const renameGroupChat = async (chatId: string, newName: string) => {
		const response = await api.put(`/chats/group/rename`, { chatId, newName });
		return response.data;
	};

	const addUserToGroupChat = async (chatId: string, userId: string) => {
		const response = await api.put(`/chats/group/user/add`, { chatId, userId });
		return response.data;
	};

	const removeUserFromGroupChat = async (chatId: string, userId: string, user: string) => {
		const response = await api.put(`/chats/group/user/remove`, { chatId, userId, user });
		return response.data;
	};
	return { accessChat, getAllUserChats, createGroupChat, renameGroupChat, addUserToGroupChat, removeUserFromGroupChat };
};
