import { twMerge } from "tailwind-merge";

type DescriptionProps = {
	text: string;
	className?: string;
};

/**
 * @description Description component. Intended to be used within the Textbox compound component.
 * @param {string} text - Text to be displayed inside the description.
 * @param {string} className - Tailwind classes to be applied to the description.
 */
const Description = ({ text, className }: DescriptionProps) => {
	return <p className={twMerge("block text-sm leading-normal text-slate-700", className)}>{text}</p>;
};

export default Description;
