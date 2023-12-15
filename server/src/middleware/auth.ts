import jwt from "jsonwebtoken";
import { UserTypeDecoded } from "@/models/user.model";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { UserError } from "@/library/errors";
import { config } from "@/config/config";

export const authorize = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		res.status(401);
		throw new UserError("Unauthorized - no token", "AUTH_ERROR");
	}
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, config.jwtTokenSecret.access || "supersecrettoken") as UserTypeDecoded;
		req.body.user = decoded.user;
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			res.status(403);
			throw new UserError("Token expired", "FORBIDDEN");
		} else {
			res.status(400);
			throw new Error(error as string);
		}
	}
});
