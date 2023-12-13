import { Icon } from "@iconify/react";
import { ChangeEvent, useState } from "react";

const Search = () => {
	const [search, setSearch] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div className="relative">
			<Icon
				className="absolute font-bold rounded-md left-4 top-4 text-slate-400"
				icon="solar:rounded-magnifer-bold-duotone"
				width="24"
				height="24"
			/>
			<input
				value={search}
				placeholder="Search chats"
				id="search"
				onChange={onChange}
				type="text"
				className={`input-w-label w-full px-6 pl-12 py-3 border-2 border-slate-200 outline-none appearance-none text-slate-800 font-bold rounded-2xl bg-slate-100 focus:bg-white transition duration-200 caret-primary`}
			/>
		</div>
	);
};

export default Search;
