import { User, UserType, UserTypeDecoded } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserError } from "@/library/errors";
import { generateAccessToken, generateRefreshToken } from "@/library/jwt";
import { config } from "@/config/config";

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
			res.status(401);
			throw new UserError("User does not exist", "USER_NOT_FOUND");
		}

		const signedUser: UserType = {
			id: user._id,
			name: user.name,
			email: user.email,
			profilePicture: user.profilePicture,
		};

		const accessToken = generateAccessToken(signedUser);
		const refreshToken = generateRefreshToken(signedUser);

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

	const signedUser = {
		id: user._id,
		name: user.name,
		email: user.email,
		profilePicture: user.profilePicture,
	};

	if (user) {
		const accessToken = generateAccessToken(signedUser);
		const refreshToken = generateRefreshToken(signedUser);

		res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7 });
		res.status(200).json({ accessToken });
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
		const decoded = jwt.verify(refreshToken, config.jwtTokenSecret.refresh || "supersecrettoken") as UserTypeDecoded;

		const user = await User.findById(decoded.user.id);
		if (!user) {
			res.status(401);
			throw new UserError("User does not exist", "USER_NOT_FOUND");
		}

		const signedUser: UserType = {
			id: user._id,
			name: user.name,
			email: user.email,
			profilePicture: user.profilePicture,
		};

		const accessToken = generateAccessToken(signedUser);

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
	res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
	res.status(200).json({ message: "Logged out" });
});

export default { login, refresh, logout, register };
