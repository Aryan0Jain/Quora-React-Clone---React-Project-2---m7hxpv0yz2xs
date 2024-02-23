"use client";
import { createContext, useContext, useState } from "react";

const DataContext = createContext({
	user: {},
	setUser: () => {},
	reloadPosts: false,
	setReloadPosts: () => {},

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

		loadingGlobally,
		stopGlobalLoader,
		startGlobalLoader,
	};
	return (
		<DataContext.Provider value={context}>{children}</DataContext.Provider>
	);
}
