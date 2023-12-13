import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { expandableInput } from "../animation/expandableInput";

const ExpandableSearch = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleMagnifier = () => {
		setIsExpanded((state) => !state);
	};

	const search = () => {
		console.log("searching");
	};

	const visibility = isExpanded ? "w-80" : "w-0";

	return (
		<div className="relative z-0 flex">
			<div className={`absolute right-8 ${visibility} top-1/2 -translate-y-1/2`}>
				<motion.div initial="hidden" animate="visible" variants={expandableInput} layout className="relative">
					<motion.input
						type="text"
						placeholder="Search chats"
						className="w-full px-6 py-3 pr-12 font-bold transition duration-200 border-2 outline-none appearance-none border-slate-200 text-slate-800 rounded-2xl bg-slate-100 focus:bg-white caret-primary"
						aria-label="Search chats"
					/>
					<motion.button
						type="button"
						aria-label="Search"
						onClick={search}
						className="absolute transition right-3 top-3 text-slate-400 hover:text-slate-600"
					>
						<Icon icon="solar:arrow-right-bold-duotone" width="28" height="28" />
					</motion.button>
				</motion.div>
			</div>
			<button type="button" aria-label="Expand search" onClick={handleMagnifier} className="transition text-slate-400 hover:text-slate-600">
				<Icon icon={`${isExpanded ? "solar:close-circle-bold-duotone" : "solar:rounded-magnifer-bold-duotone"}`} width="28" height="28" />
			</button>
		</div>
	);
};

export default ExpandableSearch;
