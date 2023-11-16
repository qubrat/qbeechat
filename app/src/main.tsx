import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Chat from "./pages/Chat.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/chat",
		element: <Chat />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
