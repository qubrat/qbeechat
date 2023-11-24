import { ChangeEvent, FC, useState } from "react";
import { Icon } from "@iconify/react";

type PasswordInputProps = {
	label: string;
	value: string | number | null;
	name: string;
	placeholder: string;
	errorMessage?: string;
	disabled?: boolean;
	required?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput: FC<PasswordInputProps> = ({ label, value, name, placeholder, errorMessage, disabled, required, onChange }) => {
	const [hidden, setHidden] = useState<boolean>(true);

	const toggleHidden = () => {
		setHidden((state) => !state);
	};

	return (
		<div className="relative">
			<input
				value={value ? value : ""}
				name={name}
				placeholder={placeholder}
				id={label}
				onChange={onChange}
				disabled={disabled}
				type={hidden ? "password" : "text"}
				className={`input-w-label w-full px-6 pb-2 border-4 border-slate-200 pt-6 outline-none appearance-none text-slate-800 font-bold rounded-2xl bg-slate-200 focus:bg-white transition duration-200 focus:ring-2 focus:ring-primary ring-inset`}
			/>
			<label htmlFor={label} className={`absolute text-sm input-label top-3 left-7 text-slate-400 ${required ? "required" : ""}`}>
				{label}
			</label>
			<button type="button" className="absolute font-bold rounded-md right-5 top-5 text-slate-400" onClick={toggleHidden}>
				{<Icon icon={hidden ? "solar:eye-bold" : "solar:eye-closed-bold"} width="24" height="24" />}
			</button>

			{errorMessage && <p className="mt-2 ml-3 text-red-600">{errorMessage}</p>}
		</div>
	);
};

export default PasswordInput;
