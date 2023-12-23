import { Icon } from "@iconify/react";

type CheckboxWithDescriptionProps = {
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	children?: React.ReactNode;
};

const CheckboxWithDescription = ({ checked, onChange, children }: CheckboxWithDescriptionProps) => {
	return (
		<div className="inline-flex items-center">
			<label className="relative flex items-center mr-4 rounded-full cursor-pointer" htmlFor="description">
				<input
					type="checkbox"
					className="relative p-[0.7rem] transition-all border-2 rounded-lg appearance-none cursor-pointer peer border-slate-500 checked:bg-primary checked:border-primary"
					id="description"
					checked={checked}
					onChange={onChange}
				/>
				<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
					<Icon icon="fluent-mdl2:skype-check" width="20" height="20" />
				</span>
			</label>
			<label className="mt-px cursor-pointer select-none" htmlFor="description">
				<div>{children}</div>
			</label>
		</div>
	);
};

export default CheckboxWithDescription;
