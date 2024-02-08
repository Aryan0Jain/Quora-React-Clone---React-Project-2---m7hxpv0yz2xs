"use client";
import { ThemeProvider } from "next-themes";
import Login from "@/components/login-signup/login";
// import { cookies } from "next/headers";
export default async function Home() {
	// const store = cookies();
	// console.log(JSON.parse(store.get("userdata").value).token)
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Login />
			<div id="portal"></div>
		</ThemeProvider>
	);
}
