import { twMerge } from "tailwind-merge";

type LabelProps = {
	text: string;
	bold?: boolean;
	className?: string;
};

/**
 * @description Label component. Intended to be used within the Textbox compound component.
 * @param {string} text - Text to be displayed inside the label.
 * @param {boolean} bold - Whether the label is bold or not.
 * @param {string} className - Tailwind classes to be applied to the label.
 */
const Label = ({ text, bold = false, className }: LabelProps) => {
	const boldClass = bold ? "font-bold" : "";

	return <p className={twMerge(`block ${boldClass} leading-relaxed text-slate-700`, className)}>{text}</p>;
};

export default Label;
