import { Icon } from "@iconify/react";

const Logo = () => {
	return (
		<div className="flex items-center cursor-pointer">
			<Icon className="font-bold rounded-md text-primary" icon="solar:user-id-bold-duotone" width="40" height="40" />
			<span className="text-2xl font-logo">
				<span className="font-bold text-primary">
					<span className="text-slate-900">q</span>Bee
				</span>
				<span className="text-slate-900"> Chat</span>
			</span>
		</div>
	);
};

const Logotype = () => {
	return (
		<div className="flex items-center cursor-pointer">
			<Icon className="font-bold rounded-md text-slate-900" icon="solar:user-id-line-duotone" width="48" height="48" />
		</div>
	);
};

export { Logo, Logotype };
