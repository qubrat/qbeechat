import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
		profiePicture: {
			type: String,
			required: true,
			trim: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
