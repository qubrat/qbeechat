import "module-alias/register";
import { Chat } from "@/models/chat.model";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// @desc    Create a group chat
// @route   POST /api/v1/chat/group
// @access  Private
const createGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	const { name, users, user } = req.body;

	if (!users || !name) {
		res.status(400);
		throw new Error("Please provide a name and users for the group chat");
	}

	let usersArray: string[] = JSON.parse(users);

	if (usersArray.length < 2) {
		res.status(400);
		throw new Error("Please provide at least 2 users for the group chat");
	}

	usersArray.push(user);

	const groupChat = await Chat.create({ chatName: name, isGroupChat: true, users: usersArray, groupAdmin: user });
	const fullChat = await Chat.findById(groupChat._id)
		.populate("users", "_id createdAt email isAdmin name profilePicture")
		.populate("groupAdmin", "_id createdAt email isAdmin name profilePicture");

	res.status(201).json(fullChat);
});

// @desc    Rename a group chat
// @route   PUT /api/v1/chat/group/rename
// @access  Private
const renameGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	const { chatId, newName } = req.body;

	if (!chatId || !newName) {
		res.status(400);
		throw new Error("Please provide a chat ID and name");
	}

	const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: newName }, { new: true })
		.populate("users", "_id createdAt email isAdmin name profilePicture")
		.populate("groupAdmin", "_id createdAt email isAdmin name profilePicture");

	res.status(200).json(updatedChat);
});

// @desc    Add a user to a group chat
// @route   PUT /api/v1/chat/group/user/add
// @access  Private
const addUserToGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	const { chatId, userId } = req.body;

	if (!chatId || !userId) {
		res.status(400);
		throw new Error("Please provide a chat ID and user ID");
	}

	const updatedChat = await Chat.findByIdAndUpdate(chatId, { $addToSet: { users: userId } }, { new: true })
		.populate("users", "_id createdAt email isAdmin name profilePicture")
		.populate("groupAdmin", "_id createdAt email isAdmin name profilePicture");

	if (!updatedChat) {
		res.status(404);
		throw new Error("Chat not found");
	} else {
		res.status(200).json(updatedChat);
	}
});

// @desc    Remove a user from a group chat
// @route   PUT /api/v1/chat/group/user/remove
// @access  Private
const removeUserFromGroupChat = expressAsyncHandler(async (req: Request, res: Response) => {
	const { chatId, userId, user } = req.body;

	if (!chatId || !userId) {
		res.status(400);
		throw new Error("Please provide a chat ID and user ID");
	}

	const chat = await Chat.findById(chatId);

	if (!chat) {
		res.status(404);
		throw new Error("Chat not found");
	}

	if (chat?.groupAdmin?.toString() !== user._id.toString()) {
		res.status(403);
		throw new Error("You are not the admin of this group chat");
	}

	if (chat?.groupAdmin?.toString() === userId) {
		res.status(403);
		throw new Error("You cannot remove yourself from the group chat");
	}

	const updatedChat = await chat
		?.updateOne({ $pull: { users: userId } })
		.populate("users", "_id createdAt email isAdmin name profilePicture")
		.populate("groupAdmin", "_id createdAt email isAdmin name profilePicture");

	if (!updatedChat) {
		res.status(404);
		throw new Error("Chat not found");
	} else {
		res.status(200).json(updatedChat);
	}
});

export default { createGroupChat, renameGroupChat, addUserToGroupChat, removeUserFromGroupChat };
