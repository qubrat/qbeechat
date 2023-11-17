import { Model, Schema, model } from "mongoose";
import { compare, genSalt, hash } from "bcryptjs";

export interface IUser {
	name: string;
	email: string;
	password: string;
	profilePicture: string;
	isAdmin: boolean;
}

interface IUserMethods {
	matchPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true },
		password: { type: String, required: true, trim: true },
		profilePicture: {
			type: String,
			trim: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

UserSchema.method("matchPassword", async function (password: string) {
	return await compare(password, this.password);
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);
});

export const User = model<IUser, UserModel>("User", UserSchema);
