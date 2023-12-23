import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserError } from "@/library/errors";
import { generateAccessToken, generateRefreshToken } from "@/library/jwt";
import { config } from "@/config/config";
import { DecodedUserType } from "@/middleware/auth";

// @desc    Login user
// @route   POST /api/v1/auth
// @access  Public
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new UserError("Did not provide all required fields", "MISSING_FIELDS");
	} else {
		const user = await User.findOne({ email });

		const match = await user?.matchPassword(password);

		if (!match) {
			res.status(401);
			throw new UserError("Bad credentials", "INVALID_CREDENTIALS");
		}

		if (!user) {
			res.status(404);
			throw new UserError("User does not exist", "USER_NOT_FOUND");
		}

		const accessToken = generateAccessToken({ id: user._id });
		const refreshToken = generateRefreshToken({ id: user._id });

		user.refreshToken = refreshToken;
		await user.save();

		res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7 });
		res.status(200).json({ accessToken });
	}
});

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password, profilePicture } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new UserError("Did not provide all required fields", "MISSING_FIELDS");
	}
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new UserError("User with given credentials already exists", "USER_EXISTS");
	}

	const user = await User.create({ name, email, password, profilePicture });

	if (user) {
		res.status(200).json({ success: `New user ${user.name} successfully created.` });
	} else {
		res.status(400);
		throw new UserError("Provided invalid user data", "INVALID_DATA");
	}
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
// @access  Public - refresh token only
const refresh = asyncHandler(async (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies.jwt) {
		res.status(401);
		throw new UserError("Unauthorized - no token", "AUTH_ERROR");
	}

	const refreshToken = cookies.jwt;

	try {
		const decoded = jwt.verify(refreshToken, config.jwtTokenSecret.refresh || "supersecrettoken") as DecodedUserType;

		const user = await User.findOne({ refreshToken }).exec();
		if (!user) {
			res.status(403);
			throw new UserError("Token not found", "FORBIDDEN");
		}
		if (user.id !== decoded.user.id) {
			res.status(403);
			throw new UserError("Token not valid", "FORBIDDEN");
		}

		const accessToken = generateAccessToken({ id: user._id });

		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(401);
		throw new UserError(err as string, "UNAUTHORIZED");
	}
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Public - clear cookie only
const logout = asyncHandler(async (req, res) => {
	const cookies = req.cookies;
	if (!cookies.jwt) {
		res.status(204);
	}
	const refreshToken = cookies.jwt;

	const user = await User.findOne({ refreshToken }).exec();

	// Is refreshToken in db?
	if (!user) {
		res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
		res.status(204);
	}

	// Delete refreshToken in db
	if (user) {
		user.refreshToken = "";
		await user.save();
	}

	res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
	res.status(200).json({ message: "Logged out" });
});

export default { login, refresh, logout, register };
