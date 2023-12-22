import { Route, Routes } from "react-router-dom";

import { ChatContextProvider } from "./context/chatContext";
import Chat from "./pages/Chat/Chat";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/RequireAuth";
import SignIn from "./pages/SignIn/SignIn";
import Page404 from "./pages/Page404/Page404";

const App = () => {
	return (
		<ChatContextProvider>
			<Routes>
				<Route path="/login" element={<SignIn />} />
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Chat />} />
				</Route>
				<Route path="*" element={<Page404 />} />
			</Routes>
			<Toaster position="bottom-center" />
		</ChatContextProvider>
	);
};

export default App;
