import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatName: { type: String, required: true, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
		picture: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
