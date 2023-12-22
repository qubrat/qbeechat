import { useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [callback]);

	return ref;
};

export default useOutsideClick;
