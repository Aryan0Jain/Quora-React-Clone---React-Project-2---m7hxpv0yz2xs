"use client";
import { useTheme } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function MessageBox() {
	const { theme, systemTheme } = useTheme();
	return (
		<ToastContainer
			autoClose={5000}
			position="top-left"
			theme={theme === "system" ? systemTheme : theme}
			pauseOnFocusLoss={false}
			limit={4}
		/>
	);
}
