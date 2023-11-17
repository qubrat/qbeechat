import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

interface JwtPayload {
	_id: string;
}

export const authorize = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
			req.body.user = await User.findById(decode._id).select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});
