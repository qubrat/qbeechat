import { FRONTEND_URL } from "@/config/settings";
import { Request, Response, NextFunction } from "express";

export const rules = (req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", FRONTEND_URL);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
};
