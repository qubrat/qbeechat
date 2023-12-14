import { rateLimit } from "express-rate-limit";
import { Log } from "@/services/logger";

export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: "Too many login attempts, please try again later.",
	handler: (req, res) => {
		Log.warn(`Too many login attempts from ${req.ip}`);
		res.status(429).json({ message: "Too many login attempts, please try again later." });
	},
	standardHeaders: true,
	legacyHeaders: false,
});
