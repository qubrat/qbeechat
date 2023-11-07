import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
		content: { type: String, trim: true },
	},
	{ timestamps: true }
);

export const messageModel = mongoose.model("Message", messageSchema);
