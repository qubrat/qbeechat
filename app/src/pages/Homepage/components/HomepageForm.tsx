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
	action: (e: React.FormEvent<HTMLFormElement>) => void;
};

const HomepageForm = ({ textTop, header, subtitleText, subtitleLink, children, setMode, modeLink, action }: HomepageFormProps) => {
	return (
		<div className="p-16 justify-center flex flex-col h-full gap-6 max-w-5xl text-left rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
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
			<form onSubmit={action} className="flex flex-col max-w-md gap-8 w-[448px]">
				{children}
			</form>
		</div>
	);
};

export default HomepageForm;
