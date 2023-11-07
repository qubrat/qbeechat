import "module-alias/register";
import { chats } from "@/data/data";

const getChats = async (req: any, res: any) => {
	try {
		res.status(200).json(chats);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getChat = async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const chat = chats.find((chat) => chat._id === id);
		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json({ error });
	}
};

export default { getChats, getChat };
