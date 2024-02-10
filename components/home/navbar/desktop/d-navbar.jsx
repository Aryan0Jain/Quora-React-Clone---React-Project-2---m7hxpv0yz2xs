"use client";
import { NAV_ICONS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import userImg from "@/assets/default_user.webp";
import quoraLogo from "@/assets/quora.png";
import SearchBox from "./searchbox";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
export default function DesktopNavbar() {
	const { theme, setTheme } = useTheme();
	function themeToggle() {
		if (theme === "light") setTheme("dark");
		else setTheme("light");
	}
	async function handleLogOut() {
		const data = await signOut();
		console.log(data);
	}
	return (
		<div className="mx-auto h-full w-fit md:flex items-center gap-1 hidden">
			<Link href="./">
				<Image
					src={quoraLogo}
					alt="Quora Logo"
					className="w-24 h-full object-cover object-center"
					priority
				/>
			</Link>
			<div className="flex mx-1 items-center">
				{NAV_ICONS.map(({ path, Icon, ActiveIcon }) => {
					return (
						<Link key={path} href={`/${path}`}>
							<div className="flex flex-col items-center gap-1">
								<div className="flex flex-col items-center hover:bg-white/5 transition">
									<Icon />
									{/* <ActiveIcon /> */}
								</div>
								<div className="w-9/12 h-[3px] bg-[#f52936] rounded-full"></div>
							</div>
						</Link>
					);
				})}
			</div>
			<SearchBox />
			{/* <button onClick={themeToggle}>Toggle</button> */}
			<button onClick={handleLogOut}>Log out</button>
			<button className="hover:opacity-70 p-2 m-1 ml-2 hover:bg-white/5 flex justify-center items-center rounded-[3px] transition">
				<Image
					src={userImg}
					alt="Profile for User"
					className="w-6 h-6 rounded-full"
				/>
			</button>
			<button className="dark:bg-[#f52936] text-[#fff] rounded-full ml-2 py-2 px-3 font-medium text-[13px] leading-none bg-[#b92b27] hover:bg-[#a82723] transition">
				Create Post
			</button>
		</div>
	);
}
