import React from "react";
import CheckboxLabel from "./CheckboxLabel";
import CheckboxDescription from "./CheckboxDescription";

type CheckboxTextboxProps = {
	children: React.ReactNode;
};

/**
 * @description Compound component that wraps the label and description components.
 * @param {React.ReactNode} children - Children to be rendered inside the textbox. Any children can be passed, but intended to be used with the Label and Description components.
 */
const Textbox = ({ children }: CheckboxTextboxProps) => {
	return (
		<label className="mt-px cursor-pointer select-none" htmlFor="textbox">
			<div>{children}</div>
		</label>
	);
};

/**
 * @description Label component. Intended to be used within the Textbox compound component.
 * @param {string} text - Text to be displayed inside the label.
 * @param {boolean} bold - Whether the label is bold or not.
 * @param {string} className - Tailwind classes to be applied to the label.
 */
Textbox.Label = CheckboxLabel;

/**
 * @description Description component. Intended to be used within the Textbox compound component.
 * @param {string} text - Text to be displayed inside the description.
 * @param {string} className - Tailwind classes to be applied to the description.
 */
Textbox.Description = CheckboxDescription;

export default Textbox;
