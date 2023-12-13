import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import axios from "axios";
import { useChatContext } from "../../../../context/chatContext";
import { BASE_URL } from "../../../../config/settings";
import Item from "../../../../components/ItemList/Item";
import { Icon } from "@iconify/react";
import Spinner from "../../../../components/Spinner";
import ItemList from "../../../../components/ItemList/ItemList";
import useOutsideClick from "../../../../hooks/useOutsideClick";

const Search = () => {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce<string>(search, 400);

	const { user, setSelectedChat } = useChatContext();

	const [loading, setLoading] = useState(false);

	const [searchResults, setSearchResults] = useState([]);
	const [resultsVisible, setResultsVisible] = useState(false);

	const handleClickOutside = () => {
		setResultsVisible(false);
	};

	const ref = useOutsideClick<HTMLDivElement>(handleClickOutside);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const accessChat = async (userId: string) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user?.token}`,
			},
		};

		const res = await axios.post(`${BASE_URL}/chat`, { userId }, config);
		setSelectedChat(res.data);
	};

	useEffect(() => {
		const fetchResults = async () => {
			if (debouncedSearch.length > 0) {
				setLoading(true);
				try {
					const res = await axios.get(`${BASE_URL}/user?search=${debouncedSearch}`, {
						headers: {
							Authorization: `Bearer ${user?.token}`,
						},
					});
					const results = res.data.map((user: any, index: number) => {
						return <Item image={user.image} title={user.name} key={index} onClick={accessChat(user._id)} />;
					});
					setSearchResults(results);
					if (results.length > 0) {
						setResultsVisible(true);
					}
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			}
		};
		if (debouncedSearch.length > 0 && user?.token) {
			fetchResults();
		}
	}, [debouncedSearch]);

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
				placeholder="Search users"
				id="search"
				onChange={handleChange}
				type="text"
				className={`caret-primary input-w-label w-full px-6 pl-12 py-3 border-4 border-slate-100 outline-none appearance-none text-slate-800 font-bold rounded-2xl bg-slate-100 focus:bg-white transition duration-200 focus:ring-2 focus:ring-primary ring-inset`}
			/>
			{loading && (
				<div className="absolute inset-y-0 flex items-center p-3 pointer-events-none right-2">
					<Spinner size="small" color="grey" />
				</div>
			)}
			{resultsVisible && !loading && (
				<div className="absolute w-full mt-4 shadow-lg rounded-2xl" ref={ref}>
					<ItemList>{searchResults}</ItemList>
				</div>
			)}
		</div>
	);
};

export default Search;
