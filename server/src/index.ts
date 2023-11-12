import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import { config } from "@/config/config";
import { Log } from "@/services/logger";

import { rules } from "@/middleware/rules";
import { logTraffic } from "@/middleware/logTraffic";

import chat from "@/routes/chat";
import user from "@/routes/user";

import error from "@/middleware/error";

const server = express();

mongoose.set("strictQuery", true);

const connectToMongo = async () => {
	try {
		await mongoose.connect(config.mongo.URL);
		Log.info("Connected to MongoDB");
		startServer();
	} catch (error) {
		Log.error(error);
	}
};

const startServer = async () => {
	// Middleware
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	//Custom Middleware
	server.use(rules);
	server.use(logTraffic);
	// Routes
	server.use("/api/v1/user", user);
	server.use("/api/v1/chat", chat);
	server.get("/api/v1", (req: express.Request, res: express.Response) => {
		res.status(200).json({ message: "API version 1.0" });
		Log.debug("Health check - API server is running.");
	});

	// Error Handling
	server.use(error.notFound);
	server.use(error.errorHandler);

	server.listen(config.server.PORT, () => {
		Log.info(`Server started on port ${config.server.PORT}`);
	});
};

connectToMongo();
