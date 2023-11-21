import { Route, Routes } from "react-router-dom";

import { ChatContextProvider } from "./context/chatContext.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Chat from "./pages/Chat/Chat.tsx";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<ChatContextProvider>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/chat" element={<Chat />} />
			</Routes>
			<Toaster position="bottom-center" />
		</ChatContextProvider>
	);
};

export default App;
