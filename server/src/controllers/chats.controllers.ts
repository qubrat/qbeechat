import "module-alias/register";
import { Chat } from "@/models/chat.model";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User } from "@/models/user.model";
import { UserError } from "@/library/errors";

// @desc    Get all user chats
// @route   GET /api/v1/chat
// @access  Private
const getAllUserChats = expressAsyncHandler(async (req: Request, res: Response) => {
	try {
		let chats: unknown = await Chat.find({ users: { $elemMatch: { $eq: req.body.user?._id } } })
			.populate("users", "_id createdAt email isAdmin name profilePicture")
			.populate("groupAdmin", "_id createdAt email isAdmin name profilePicture")
			.populate("lastMessage")
			.sort({ updatedAt: -1 });
		chats = await User.populate(chats, { path: "lastMessage.sender", select: "name email profilePicture" });
		res.status(200).json(chats);
	} catch (error: any) {
		res.status(400);
		throw new Error(error.message as string);
	}
});

// @desc    Access a chat - create if it doesn't exist, otherwise return it
// @route   POST /api/v1/chat/access
// @access  Private
const accessChat = expressAsyncHandler(async (req: Request, res: Response) => {
	const { userId } = req.body;
	if (!userId) {
		res.status(400);
		throw new Error("User ID is required");
	}
	let chats: any = await Chat.find({
		isGroupChat: false,
		$and: [{ users: { $elemMatch: { $eq: userId } } }, { users: { $elemMatch: { $eq: req.body.user?._id } } }],
	})
		.populate("users", "_id createdAt email isAdmin name profilePicture")
		.populate("lastMessage");

	chats = await User.populate(chats, { path: "lastMessage.sender", select: "name email profilePicture" });

	if (chats.length > 0) {
		res.status(200).json(chats[0]);
	} else {
		try {
			const selectedUser = await User.findById(userId);
			if (!selectedUser) {
				res.status(404);
				throw new UserError("User not found", "USER_NOT_FOUND");
			}
			const createdChat = await Chat.create({
				chatName: selectedUser.name,
				isGroupChat: false,
				users: [req.body.user?._id, userId],
				picture: selectedUser.profilePicture,
			});
			const fullChat = await Chat.findById(createdChat._id).populate("users", "_id createdAt email isAdmin name profilePicture");
			res.status(201).json(fullChat);
		} catch (error: any) {
			res.status(400);
			throw new Error(error.message as string);
		}
	}
});

export default { getAllUserChats, accessChat };
