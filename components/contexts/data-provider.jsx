"use client";
import { createContext, useContext, useState } from "react";

const DataContext = createContext({
	user: {},
	setUser: () => {},
	reloadPosts: false,
	setReloadPosts: () => {},
	displayMessageBox: false,
	setDisplayMessageBox: () => {},
	displayMessage: "",
	setDisplayMessage: () => {},
	messageType: "",
	setMessageType: () => {},
	loadingGlobally: true,
	stopGlobalLoader: () => {},
	startGlobalLoader: () => {},
});
export const useDataContext = () => {
	return useContext(DataContext);
};
export default function DataContextProvider({ children }) {
	const [user, setUser] = useState({});
	const [reloadPosts, setReloadPosts] = useState(false);
	const [displayMessageBox, setDisplayMessageBox] = useState(false);
	const [displayMessage, setDisplayMessage] = useState("This is a test.");
	const [messageType, setMessageType] = useState("success");
	const [loadingGlobally, setLoadingGlobally] = useState(true);
	function stopGlobalLoader() {
		setLoadingGlobally(false);
	}
	function startGlobalLoader() {
		setLoadingGlobally(true);
	}
	const context = {
		user,
		setUser,
		reloadPosts,
		setReloadPosts,
		displayMessageBox,
		setDisplayMessageBox,
		displayMessage,
		setDisplayMessage,
		messageType,
		setMessageType,
		loadingGlobally,
		stopGlobalLoader,
		startGlobalLoader,
	};
	return (
		<DataContext.Provider value={context}>{children}</DataContext.Provider>
	);
}
