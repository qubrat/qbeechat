import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toastAnimation } from "../animation/toast";
import toast from "react-hot-toast";

export type ToastProps = {
	message: string;
	type: "success" | "error" | "warning";
};

const customToast = ({ message, type }: ToastProps) => {
	const toastVariant = {
		bg: type === "error" ? "bg-error" : type === "warning" ? "bg-warning" : "bg-success",
		bgDark: type === "error" ? "bg-errorDark" : type === "warning" ? "bg-warningDark" : "bg-successDark",
		icon: type === "error" ? "mingcute:close-fill" : type === "warning" ? "healthicons:alert" : "mingcute:check-fill",
		title: type === "error" ? "Oh snap!" : type === "warning" ? "Warning!" : "Well done!",
	};
	toast.custom(
		(t) => (
			<>
				{t.visible && (
					<motion.div
						variants={toastAnimation}
						initial="hiddenToast"
						animate="visibleToast"
						exit="exitToast"
						className={`toast relative flex items-center gap-4 px-10 py-6 pl-4 ${toastVariant.bg} text-slate-100 rounded-3xl max-w-md`}
						key="toast"
						role="alert"
					>
						<div className={`p-2 rounded-full ${toastVariant.bgDark}`}>
							<Icon icon={toastVariant.icon} width="28" height="28" />
						</div>
						<div className="text-left">
							<p className="text-xl font-bold">{toastVariant.title}</p>
							<p>{message}</p>
						</div>
						<button
							className="absolute bg-white rounded-full bg-opacity-20 top-3 right-3 hover:animate-spin-once"
							onClick={() => toast.dismiss(t.id)}
						>
							<Icon icon="iconamoon:close-bold" width="18" height="18" />
						</button>
					</motion.div>
				)}
			</>
		),
		{ duration: 5000 }
	);
};

export default customToast;
