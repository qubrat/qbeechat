import { Request, Response, NextFunction } from "express";
import { Log } from "@/services/logger";

export const logTraffic = (req: Request, res: Response, next: NextFunction) => {
	Log.info(`Incoming -> Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

	res.on("finish", () => {
		Log.infoRes(
			`Outgoing -> Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], Status: [${res.statusCode} ${res.statusMessage}]`
		);
	});
	next();
};
