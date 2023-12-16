import { Icon } from "@iconify/react";

const Logo = () => (
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

const Logotype = () => (
	<Icon className="transition duration-200 cursor-pointer text-slate-800 hover:text-primary" icon="solar:user-id-linear" width="48" height="48" />
);

export { Logo, Logotype };
