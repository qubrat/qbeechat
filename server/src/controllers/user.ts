import "module-alias/register";
import asyncHandler from "express-async-handler";
import { chats } from "@/data/data";
import { NextFunction, Request, Response } from "express";
import { User } from "@/models/user";
import { generateToken } from "@/library/generateToken";

const getUsers = async (req: Request, res: Response) => {
	try {
		return res.status(200).json(chats);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getUser = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const user = chats.find((chat) => chat._id === id);
	// 	return user ? res.status(200).json(user) : res.status(404).json({ message: "Resource not found" });
	// } catch (error) {
	// 	res.status(500).json({ error });
	// }
};

const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Please provide all required fields" });
	}
	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(400).json({ message: "User already exists" });
	}

	const user = await User.create({ name, email, password });

	if (user) {
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		return res.status(400).json({ message: "Invalid user data" });
	}
};

const auth = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please provide all required fields" });
	} else {
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			return res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			return res.status(401).json({ message: "Invalid email or password" });
		}
	}
};

export default { getUsers, getUser, register, auth };
