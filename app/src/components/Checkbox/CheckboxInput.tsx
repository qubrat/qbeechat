import { Icon } from "@iconify/react";
import { useCheckbox } from "./Checkbox";
import { twMerge } from "tailwind-merge";

type CheckboxInputProps = {
	className?: string;
	disabled?: boolean;
};

/**
 * @description Custom checkbox component. Intended to be used within the Checkbox compound component.
 * @param {boolean} disabled - Whether the checkbox is disabled or not.
 * @param {string} className - Tailwind classes to be applied to the checkbox.
 */
const CheckboxInput = ({ disabled, className }: CheckboxInputProps) => {
	const { checked, onChange } = useCheckbox();

	return (
		<label className={twMerge("relative flex items-center mr-4 rounded-full cursor-pointer", className)} htmlFor="textbox">
			<input
				type="checkbox"
				className="relative p-3 transition-all rounded-lg appearance-none cursor-pointer bg-slate-200 peer checked:bg-primary ring-2 ring-transparent hover:ring-slate-300 hover:checked:ring-primary-200 active:bg-primary-500"
				id="textbox"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
				<Icon icon="fluent-mdl2:skype-check" width="18" height="18" />
			</span>
		</label>
	);
};

export default CheckboxInput;
