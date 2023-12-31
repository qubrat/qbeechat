import { Log } from "@/services/logger";
import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		code: err.code,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
	Log.error(err);
};

export default { notFound, errorHandler };
