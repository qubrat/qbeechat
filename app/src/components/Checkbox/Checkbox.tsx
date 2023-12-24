import { createContext, useContext } from "react";
import Input from "./Input";
import Textbox from "./Textbox";
import { twMerge } from "tailwind-merge";

interface ICheckboxContext {
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxContext = createContext<ICheckboxContext | null>(null);

type CheckboxProps = {
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children: React.ReactNode;
	className?: string;
};

/**
 * @description Checkbox compound component that wraps the input and textbox components.
 * @param {boolean} checked - Whether the checkbox is checked or not. Intended to be used with some state.
 * @param {function} onChange - Function to be called when the checkbox is checked or unchecked.
 * @param {React.ReactNode} children - Children to be rendered inside the checkbox. Can accept any children, but intended to be used with the Input and Textbox components.
 * @param {string} className - Tailwind classes to be applied to the checkbox.
 */
const Checkbox = ({ checked, onChange, children, className }: CheckboxProps) => {
	return (
		<CheckboxContext.Provider value={{ checked, onChange }}>
			<div className={twMerge("inline-flex items-center", className)}>{children}</div>
		</CheckboxContext.Provider>
	);
};

export const useCheckbox = () => {
	const context = useContext(CheckboxContext);
	if (!context) {
		throw new Error("useCheckbox must be used within a Checkbox");
	}
	return context;
};

/**
 * @description Custom checkbox component. Intended to be used within the Checkbox compound component.
 * @param {boolean} disabled - Whether the checkbox is disabled or not.
 * @param {string} className - Tailwind classes to be applied to the checkbox.
 */
Checkbox.Input = Input;
/**
 * @description Compound component that wraps the label and description components.
 * @param {React.ReactNode} children - Children to be rendered inside the textbox. Intended to be used with the Label and Description components.
 */
Checkbox.Text = Textbox;

export { Checkbox };
