import { Route, Routes } from "react-router-dom";

import { ChatContextProvider } from "./context/chatContext";
import Chat from "./pages/Chat/Chat";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/Auth/RequireAuth";
import SignIn from "./pages/SignIn/SignIn";
import Page404 from "./pages/Page404/Page404";
import PersistLogin from "./components/Auth/PersistLogin";
import RegisterSuccess from "./pages/SignIn/components/RegisterSuccess";

const App = () => {
	return (
		<ChatContextProvider>
			<Routes>
				{/*	Public routes*/}
				<Route path="/login" element={<SignIn />} />
				<Route path="/registered" element={<RegisterSuccess />} />
				{/*	Protected routes*/}
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Chat />} />
					</Route>
				</Route>
				{/*	Fallback */}
				<Route path="/*" element={<Page404 />} />
			</Routes>
			<Toaster position="bottom-center" />
		</ChatContextProvider>
	);
};

export default App;
