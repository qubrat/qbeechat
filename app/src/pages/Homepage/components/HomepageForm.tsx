import React from "react";
import type { HomepageMode } from "../Homepage";

type HomepageFormProps = {
	textTop: string;
	header: string;
	subtitleText: string;
	subtitleLink: string;
	children: React.ReactNode;
	buttonText: string;
	setMode: React.Dispatch<React.SetStateAction<HomepageMode>>;
	modeLink: HomepageMode;
};

const HomepageForm = ({ textTop, header, subtitleText, subtitleLink, children, setMode, modeLink }: HomepageFormProps) => {
	return (
		<div className="flex flex-col h-full gap-6 m-16">
			<h2 className="font-bold uppercase text-slate-400">{textTop}</h2>
			<h1 className="flex items-baseline gap-4 text-4xl font-bold text-slate-800">
				<span className="w-[10px] h-[10px] rounded-full bg-primary"></span>
				<span className="-translate-x-3">{header}</span>
			</h1>
			<p className="text-lg cursor-default text-slate-400">
				{subtitleText}{" "}
				<span
					className="underline transition duration-200 cursor-pointer text-primary underline-offset-4 decoration-2 decoration-transparent hover:decoration-primary "
					onClick={() => setMode(modeLink)}
				>
					{subtitleLink}
				</span>
			</p>
			{children}
		</div>
	);
};

export default HomepageForm;
