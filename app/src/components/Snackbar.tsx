import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toast } from "../animation/toast";

type SnackbarProps = {
	text: string;
	variant: "error" | "success";
	visible?: boolean;
};

const Snackbar = ({ text, variant }: SnackbarProps) => {
	const toastVariant = {
		bg: variant === "error" ? "bg-error" : "bg-success",
		bgDark: variant === "error" ? "bg-errorDark" : "bg-successDark",
		icon: variant === "error" ? "iconamoon:close-bold" : "iconamoon:check-bold",
		title: variant === "error" ? "Oh snap!" : "Success!",
	};
	return (
		<motion.div
			variants={toast}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`fixed flex items-center gap-4 px-8 py-6 pl-4 transform -translate-x-1/2 left-1/2 bottom-4 ${toastVariant.bg} text-slate-100 rounded-3xl`}
		>
			<div className={`p-1 rounded-full ${toastVariant.bgDark}`}>
				<Icon icon={toastVariant.icon} width="32" height="32" />
			</div>
			<div className="text-left">
				<p className="text-xl font-bold">{toastVariant.title}</p>
				<p>{text}</p>
			</div>
		</motion.div>
	);
};

export default Snackbar;
