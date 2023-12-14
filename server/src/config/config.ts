import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.mtt4o8b.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

export const config = {
	mongo: {
		URL: MONGO_URL,
	},
	server: {
		PORT: SERVER_PORT,
	},
	jwtTokenSecret: {
		access: ACCESS_TOKEN_SECRET,
		refresh: REFRESH_TOKEN_SECRET,
	},
};
