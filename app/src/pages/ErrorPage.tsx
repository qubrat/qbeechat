import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="text-center ">
			<h1 className="mb-6 text-3xl font-bold">Oops!</h1>
			<p className="mb-6 text-xl">Sorry, an unexpected error has occurred.</p>
			<p className="text-gray-400">
				<i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
			</p>
		</div>
	);
}
