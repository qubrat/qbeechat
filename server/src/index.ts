import "module-alias/register";
import express from "express";
import { config } from "@/config/config";
import { Log } from "@/services/logger";

import { rules } from "@/middleware/rules";
import { logTraffic } from "@/middleware/logTraffic";

import chat from "@/routes/chat";

const server = express();

server.use(rules);
server.use(logTraffic);

server.use("/api/v1/chat", chat);

server.get("/api/v1", (req: express.Request, res: express.Response) => {
	res.status(200).json({ message: "API version 1.0" });
	Log.debug("Health check - API server is running.");
});

server.listen(config.server.PORT, () => {
	Log.info(`Server started on port ${config.server.PORT}`);
});
