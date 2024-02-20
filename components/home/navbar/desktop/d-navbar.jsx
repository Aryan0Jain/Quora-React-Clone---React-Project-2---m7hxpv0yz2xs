"use client";
import { NAV_ICONS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import userImg from "@/assets/default_user.webp";
import quoraLogo from "@/assets/quora.png";
import SearchBox from "./searchbox";
import { usePathname } from "next/navigation";
import ProfileDropDown from "./profile-dropdown";
import CreatePost from "../../create-post";
export default function DesktopNavbar() {
	const [showMenu, setShowMenu] = useState(false);
	const pathName = usePathname();
	const [showCreatePost, setShowCreatePost] = useState(false);
	function toggleShowMenu() {
		setShowMenu((prev) => !prev);
	}
	function closeShowMenu() {
		setShowMenu(false);
	}
	return (
		<div className="mx-auto h-full w-fit md:flex items-center gap-1 hidden">
			<Link href="/">
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
							<div className="flex flex-col items-center gap-1 relative">
								<div className="flex flex-col items-center hover:bg-white/5 transition"></div>
								{`/${path}` === pathName && (
									<>
										<ActiveIcon />
										<div className="w-9/12 h-[3px] bg-[#f52936] rounded-full absolute -bottom-2"></div>
									</>
								)}
								{`/${path}` !== pathName && (
									<>
										<Icon />
										<div className="w-9/12 h-[3px] bg-transparent rounded-full absolute -bottom-2"></div>
									</>
								)}
							</div>
						</Link>
					);
				})}
			</div>
			<SearchBox />
			<div className="relative p-3">
				<button
					onClick={toggleShowMenu}
					className="ml-2 lg:ml-4 flex justify-center items-center rounded-[3px] transition"
				>
					<Image
						src={userImg}
						alt="Profile for User"
						className="w-6 h-6 rounded-full hover:bg-white/5 hover:opacity-70"
					/>
				</button>
				<ProfileDropDown
					showMenu={showMenu}
					toggleMenu={toggleShowMenu}
					closeMenu={closeShowMenu}
				/>
			</div>
			<button
				onClick={() => setShowCreatePost(true)}
				className="dark:bg-[#f52936] text-[#fff] rounded-full ml-2 py-2 px-2 lg:px-3 font-medium text-[13px] leading-none bg-[#b92b27] hover:bg-[#a82723] transition"
			>
				Create Post
			</button>
			<CreatePost show={showCreatePost} setShow={setShowCreatePost} />
		</div>
	);
}
