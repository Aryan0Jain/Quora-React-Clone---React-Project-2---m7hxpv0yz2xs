import NextThemeProvider from "@/components/contexts/theme-provider";
import "./globals.css";
import Session from "@/components/contexts/session-provider";
import { getServerSession } from "next-auth";
import Navbar from "@/components/home/navbar/navbar";
import DataContextProvider from "@/components/contexts/data-provider";
import MessageBox from "@/components/message-box/message-box";
import GlobalLoader from "@/components/common/global-loader";

export const metadata = {
	title: "Quora - A place to share knowledge and better understand the world",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body>
				<Session>
					<DataContextProvider>
						<NextThemeProvider>
							{session && <Navbar />}
							<div className="bg-[#F1F2F2] dark:bg-[#181818] flex justify-center">
								{children}
								<div id="portal">
									<MessageBox />
								</div>
							</div>
							<GlobalLoader />
						</NextThemeProvider>
					</DataContextProvider>
				</Session>
			</body>
		</html>
	);
}
