"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function NextThemeProvider({ props, children }) {
	return (
		<ThemeProvider
			{...props}
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
