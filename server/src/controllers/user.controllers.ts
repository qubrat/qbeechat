import "module-alias/register";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User } from "@/models/user.model";
import { UserError } from "@/library/errors";
import { generateAccessToken, generateRefreshToken } from "@/library/jwt";

// @desc    Get all users
// @route   GET /api/v1/user
// @access  Private
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search.toString(), $options: "i" } },
					{ email: { $regex: req.query.search.toString(), $options: "i" } },
				],
		  }
		: {};

	const users = await User.find(keyword).find({ _id: { $ne: req.body.user?.id } });
	res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/v1/user/:id
// @access  Private
const getUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new UserError("User not found", "USER_NOT_FOUND");
	}
});

export default { getAllUsers, getUser };
