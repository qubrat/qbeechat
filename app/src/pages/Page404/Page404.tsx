import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Page404 = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1 className="font-bold text-7xl text-primary">404</h1>
			<h2 className="my-4 text-2xl font-bold">Whoops!</h2>
			<p className="text-xl">The page you are looking for does not exist.</p>
			<Button type="button" text="Go back" size="medium" onClick={() => navigate(-1)} className="px-16 mt-8 w-fit" />
		</div>
	);
};

export default Page404;
