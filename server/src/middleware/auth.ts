import jwt from "jsonwebtoken";
import { UserType } from "@/models/user.model";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { UserError } from "@/library/errors";
import { config } from "@/config/config";

export type DecodedUserType = {
	user: UserType;
	iat: number;
	exp: number;
};

export const authorize = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = (req.headers["authorization"] || req.headers["Authorization"]) as string;

	if (!authHeader?.startsWith("Bearer ")) {
		res.status(401);
		throw new UserError("Unauthorized - no token", "UNAUTHORIZED");
	}
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, config.jwtTokenSecret.access || "supersecrettoken") as DecodedUserType;
		req.body.user = decoded.user;
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			res.status(401);
			throw new UserError("Unauthorized - token expired", "UNAUTHORIZED");
		} else {
			res.status(400);
			throw new Error(error as string);
		}
	}
});
