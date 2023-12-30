import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { expandableInput } from "../../animation/expandableInput";

const ExpandableSearch = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleMagnifier = () => {
		setIsExpanded((state) => !state);
	};

	const search = () => {
		console.log("searching");
	};

	const visibility = isExpanded ? "w-[280px]" : "w-0";

	return (
		<div className="relative flex">
			<div className={`absolute -right-3 ${visibility} top-1/2 -translate-y-1/2`}>
				<motion.div initial="hidden" animate="visible" variants={expandableInput} layout className="relative">
					<motion.button
						type="button"
						aria-label="Close search"
						title="Close search"
						onClick={() => setIsExpanded(false)}
						className="absolute transition left-3 top-3 text-slate-400 hover:text-slate-600 active:text-slate-800"
					>
						<Icon icon="solar:forward-bold-duotone" width="28" height="28" />
					</motion.button>
					<motion.input
						type="text"
						placeholder="Search chats"
						className="w-full px-12 py-3 font-bold transition duration-200 border-2 outline-none appearance-none input-w-label border-slate-200 text-slate-800 caret-primary rounded-xl bg-slate-200 focus:bg-white focus:ring-2 focus:ring-primary focus:ring-inset"
						aria-label="Search chats"
					/>
					<motion.button
						type="button"
						aria-label="Search"
						onClick={search}
						title="Search"
						className="absolute transition right-3 top-3 text-slate-400 hover:text-slate-600 active:text-slate-800"
					>
						<Icon icon="solar:magnifer-bold-duotone" width="28" height="28" />
					</motion.button>
				</motion.div>
			</div>
			<button
				type="button"
				aria-label="Search chats"
				title="Search for chats"
				onClick={handleMagnifier}
				className="transition text-slate-400 hover:text-slate-600 active:text-slate-800"
			>
				<Icon icon="solar:magnifer-bold-duotone" width="28" height="28" />
			</button>
		</div>
	);
};

export default ExpandableSearch;
