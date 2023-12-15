import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toastAnimation } from "../animation/toast";
import toast from "react-hot-toast";

export type ToastProps = {
	message: string;
	variant: "success" | "error" | "warning";
};

const customToast = ({ message, variant }: ToastProps) => {
	const toastVariants = {
		success: {
			background: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-accent to-green",
			iconBackground: "bg-green-dark",
			icon: "mingcute:check-fill",
			text: "Well done!",
		},
		error: {
			background: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-accent to-red",
			iconBackground: "bg-red-dark",
			icon: "mingcute:close-fill",
			text: "Oh snap!",
		},
		warning: {
			background: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-accent to-orange",
			iconBackground: "bg-orange-dark",
			icon: "healthicons:alert",
			text: "Warning!",
		},
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
						className={`toast relative flex items-center gap-4 px-10 py-6 pl-4 text-slate-100 rounded-3xl max-w-md shadow-2xl ${toastVariants[variant].background}`}
						key="toast"
						role="alert"
					>
						<div className={`p-2 rounded-full ${toastVariants[variant].iconBackground}`}>
							<Icon icon={toastVariants[variant].icon} width="28" height="28" />
						</div>
						<div className="text-left">
							<p className="text-xl font-bold">{toastVariants[variant].text}</p>
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
