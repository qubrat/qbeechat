import { Icon } from "@iconify/react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/login");
	};

	return (
		<div className="p-16 justify-center items-center flex flex-col h-full gap-6 max-w-5xl text-left rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
			<div className="p-4 w-fit rounded-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-accent to-green text-slate-100 border-green-light border-4 shadow-[0_0_40px_0_rgba(88,187,105,0.4)]">
				<Icon icon="mingcute:check-fill" width="48" height="48" />
			</div>
			<h1 className="text-4xl font-bold text-center text-slate-700">Congrats!</h1>
			<p className="text-center text-slate-700">
				You have successfully registered <br /> and can now log in.
			</p>
			<Button type="button" size="medium" text="Go to login" color="success" onClick={handleClick} />
		</div>
	);
};

export default RegisterSuccess;
