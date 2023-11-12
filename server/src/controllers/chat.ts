import "module-alias/register";
import { chats } from "@/data/data";
import { NextFunction, Request, Response } from "express";

const getChats = async (req: Request, res: Response) => {
	try {
		return res.status(200).json(chats);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getChat = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const chat = chats.find((chat) => chat._id === id);
		return chat ? res.status(200).json(chat) : res.status(404).json({ message: "Resource not found" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export default { getChats, getChat };
