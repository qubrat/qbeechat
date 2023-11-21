import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react";

const Search = () => {
	const [search, setSearch] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div className="relative">
			<Icon className="absolute font-bold rounded-md left-4 top-4 text-slate-400" icon="ph:magnifying-glass-bold" width="24" height="24" />
			<input
				value={search}
				placeholder="Search"
				id="search"
				onChange={onChange}
				type="text"
				className={`input-w-label w-full px-6 pl-12 py-3 border-4 border-slate-100 outline-none appearance-none text-slate-800 font-bold rounded-full bg-slate-100 focus:bg-white transition duration-200 focus:ring-2 focus:ring-primary ring-inset`}
			/>
		</div>
	);
};

export default Search;
