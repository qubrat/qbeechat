import { ChangeEvent, FC } from "react";
import { Icon } from "@iconify/react";

type InputProps = {
	type: "text" | "number" | "email";
	label: string;
	value: string | number | null;
	name: string;
	placeholder: string;
	icon?: string;
	errorMessage?: string;
	disabled?: boolean;
	required?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({ type, label, value, name, icon, placeholder, errorMessage, disabled, required, onChange }) => {
	return (
		<div className="relative">
			<input
				value={value ? value : ""}
				name={name}
				placeholder={placeholder}
				id={label}
				onChange={onChange}
				disabled={disabled}
				type={type}
				className={`input-w-label w-full px-6 pb-2 border-4 border-slate-200 pt-6 outline-none appearance-none text-slate-800 font-bold rounded-2xl bg-slate-200 focus:bg-white transition duration-200 focus:ring-2 focus:ring-primary ring-inset`}
			/>
			<label htmlFor={label} className={`absolute text-sm input-label top-3 left-7 text-slate-400 ${required ? "required" : ""}`}>
				{label}
			</label>
			{icon && <Icon className="absolute font-bold rounded-md right-5 top-5 text-slate-400" icon={icon} width="24" height="24" />}
			{errorMessage && <p className="mt-2 ml-3 text-red-600">{errorMessage}</p>}
		</div>
	);
};

export default Input;
