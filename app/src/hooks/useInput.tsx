import { ChangeEvent, useState } from "react";

const useInput = (initialValue: string | number, required: boolean = false) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState<string | undefined>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setError(undefined);
		setValue(e.target.value);
	};

	const validate = () => {
		if (!value.toString() && required) {
			setError("This field cannot be empty");
			return false;
		} else {
			setError(undefined);
			return true;
		}
	};

	return {
		value,
		error,
		onChange: handleChange,
		setError,
		validate,
	};
};

export default useInput;
