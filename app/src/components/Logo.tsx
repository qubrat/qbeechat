import { Icon } from "@iconify/react";

const Logo = () => {
	return (
		<div className="flex items-center">
			<Icon className="font-bold rounded-md text-primary" icon="ph:chat-circle-text-duotone" width="40" height="40" />
			<span className="text-2xl font-logo">
				<span className="font-bold text-primary">
					<span className="text-slate-900">q</span>Bee
				</span>
				<span className="text-slate-900"> Chat</span>
			</span>
		</div>
	);
};

export default Logo;
