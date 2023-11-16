import "module-alias/register";
import asyncHandler from "express-async-handler";
import { chats } from "@/data/data";
import { NextFunction, Request, Response } from "express";
import { User } from "@/models/user";
import { generateToken } from "@/library/generateToken";
import { UserError } from "@/library/errors";

const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.find({});
	res.status(200).json(users);
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new UserError("User not found", "USER_NOT_FOUND");
	}
});

const register = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new UserError("Did not provide all required fields", "MISSING_FIELDS");
	}
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new UserError("User with given credentials already exists", "USER_EXISTS");
	}

	const user = await User.create({ name, email, password });

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400).json({ message: "Invalid user data", code: "INVALID_DATA" });
		throw new UserError("Provided invalid user data", "INVALID_DATA");
	}
});

const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new UserError("Please provide all required fields", "MISSING_FIELDS");
	} else {
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new UserError("Invalid email or password", "INVALID_CREDENTIALS");
		}
	}
});

export default { getUsers, getUser, register, auth };
