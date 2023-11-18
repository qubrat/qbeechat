import "module-alias/register";
import { Chat } from "@/models/chat";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User } from "@/models/user";

const getAllChats = async (req: Request, res: Response) => {
	const chats = await Chat.find().populate("users");
	res.status(200).json(chats);
};

const accessChat = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.body;
	if (!userId) {
		res.status(400);
		throw new Error("User ID is required");
	}
	let chats: any = await Chat.find({
		isGroupChat: false,
		$and: [{ users: { $elemMatch: { $eq: userId } } }, { users: { $elemMatch: { $eq: req.body.user?._id } } }],
	})
		.populate("users", "-password")
		.populate("lastMessage");

	chats = await User.populate(chats, { path: "lastMessage.sender", select: "name email profilePicture" });

	if (chats.length > 0) {
		res.status(200).json(chats[0]);
	} else {
		try {
			const createdChat = await Chat.create({ chatName: "sender", isGroupChat: false, users: [req.body.user?._id, userId] });
			const fullChat = await Chat.findById(createdChat._id).populate("users", "-password");
			res.status(201).json(fullChat);
		} catch (error: any) {
			res.status(400);
			throw new Error(error.message as string);
		}
	}
};

const createGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({ message: "createGroupChat" });
});
const renameGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({ message: "renameGroupChat" });
});
const addUserToGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({ message: "addUserToGroupChat" });
});
const removeUserFromGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({ message: "removeUserFromGroupChat" });
});

export default { getAllChats, accessChat, createGroupChat, renameGroupChat, addUserToGroupChat, removeUserFromGroupChat };
