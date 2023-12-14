import { UserType } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { config } from "@/config/config";
import { tokenExpirationTime } from "@/config/settings";

const generateAccessToken = (user: UserType) => {
	const accessToken = jwt.sign(
		{
			user: user,
		},
		config.jwtTokenSecret.access || "supersecrettoken",
		{
			expiresIn: tokenExpirationTime.access,
		}
	);

	return accessToken;
};

const generateRefreshToken = (user: UserType) => {
	const refreshToken = jwt.sign(
		{
			user: user,
		},
		config.jwtTokenSecret.refresh || "supersecrettoken",
		{
			expiresIn: tokenExpirationTime.refresh,
		}
	);

	return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
