import { ChangeEvent, useState } from "react";

const useInput = (initialValue: string | null) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return {
		value,
		error,
		onChange: handleChange,
		setError,
	};
};

export default useInput;
