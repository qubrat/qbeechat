import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import React from "react";
import { modal } from "../animation/modal";

type ModalProps = {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	visible: boolean;
	children?: React.ReactNode;
};

const Modal = ({ children, visible, setVisible }: ModalProps) => {
	const handleClose = () => {
		setVisible(false);
	};

	return (
		<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-opacity-60 bg-slate-900">
			<motion.div
				variants={modal}
				initial="hidden"
				animate={visible ? "visible" : "hidden"}
				className="relative flex flex-col items-center justify-center w-1/3 bg-white h-1/3 rounded-3xl"
			>
				<button
					className="absolute rounded-full text-slate-400 bg-slate-400 bg-opacity-20 top-3 right-3 hover:animate-spin-once"
					onClick={handleClose}
				>
					<Icon icon="iconamoon:close-bold" width="18" height="18" />
				</button>
				{children}
			</motion.div>
		</div>
	);
};

export default Modal;
