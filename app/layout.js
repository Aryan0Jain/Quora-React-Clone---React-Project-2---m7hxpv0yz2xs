import NextThemeProvider from "@/components/contexts/theme-provider";
import "./globals.css";
import Session from "@/components/contexts/session-provider";
import { getServerSession } from "next-auth";
import Navbar from "@/components/home/navbar/navbar";

export const metadata = {
	title: "Quora - A place to share knowledge and better understand the world",
	// description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body>
				<Session>
					<NextThemeProvider>
						{session && <Navbar />}
						<div className="bg-[#F1F2F2] dark:bg-[#181818]">
							{children}
							<div id="portal"></div>
						</div>
					</NextThemeProvider>
				</Session>
			</body>
		</html>
	);
}
