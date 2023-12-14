type ErrorType =
	| "USER_NOT_FOUND"
	| "REGISTER_ERROR"
	| "AUTH_ERROR"
	| "MISSING_FIELDS"
	| "USER_EXISTS"
	| "INVALID_DATA"
	| "INVALID_CREDENTIALS"
	| "UNAUTHORIZED"
	| "FORBIDDEN";

export class UserError extends Error {
	code: string;
	cause: any;

	constructor(message: string, code: ErrorType, cause?: any) {
		super(message);
		this.code = code;
		this.cause = cause;
	}
}
