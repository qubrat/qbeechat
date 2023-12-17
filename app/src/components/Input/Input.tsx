import { ChangeEvent, FC, HTMLAttributes, useState } from "react";
import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

type InputProps = {
	type: "text" | "number" | "email" | "password";
	label: string;
	value: string | number;
	name: string;
	placeholder: string;
	error?: string;
	icon?: string;
	disabled?: boolean;
	required?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

const Input: FC<React.PropsWithChildren<HTMLAttributes<HTMLDivElement> & InputProps>> = ({
	type,
	label,
	value,
	name,
	icon,
	placeholder,
	error,
	disabled,
	required,
	onChange,
	className,
}) => {
	const [hidden, setHidden] = useState<boolean>(true);

	const toggleHidden = () => {
		setHidden((state) => !state);
	};

	const inputType = () => {
		if (type === "password") {
			return hidden ? "password" : "text";
		} else {
			return type;
		}
	};

	const renderIcon = () => {
		if (type === "password") {
			return (
				<button type="button" className="absolute font-bold rounded-md right-5 top-5 text-slate-400" onClick={toggleHidden}>
					{<Icon icon={hidden ? "solar:eye-bold-duotone" : "solar:eye-closed-bold"} width="24" height="24" />}
				</button>
			);
		} else if (icon) {
			return <Icon className="absolute font-bold rounded-md right-5 top-5 text-slate-400" icon={icon} width="24" height="24" />;
		} else {
			return null;
		}
	};

	const requiredAsterisk = () => {
		if (required) {
			return "after:content-['*'] after:text-current after:ml-1";
		} else {
			return "";
		}
	};

	const errorState = () => {
		if (error) {
			return "ring-2 ring-red ring-inset bg-white";
		} else {
			return "";
		}
	};

	return (
		<div className={twMerge("relative", className)}>
			<input
				type={inputType()}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
				className={twMerge(
					"w-full px-6 pt-6 pb-2 font-bold transition duration-200 border-4 outline-none appearance-none input-w-label border-slate-200 text-slate-800 rounded-2xl bg-slate-200 focus:bg-white focus:ring-2 focus:ring-primary focus:ring-inset",
					errorState()
				)}
			/>
			<label htmlFor={label} className={`absolute text-sm input-label top-3 left-7 text-slate-400 ${requiredAsterisk()}`}>
				{label}
			</label>
			{renderIcon()}
			{error ? <small className="absolute -bottom-5 left-3 text-red">{error}</small> : null}
		</div>
	);
};

export default Input;
