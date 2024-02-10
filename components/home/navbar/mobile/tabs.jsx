import { NAV_ICONS } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import userImg from "@/assets/default_user.webp";
import Image from "next/image";
export default function MobileTabs() {
	return (
		<div className="flex dark:bg-[#202020]">
			{NAV_ICONS.map(({ path, Icon, ActiveIcon }) => {
				return (
					<Link
						key={path}
						href={path}
						className="flex-1 flex justify-center items-center border-r border-y border-[#dee0e1] dark:border-[#393839] h-11"
					>
						<Icon />
					</Link>
				);
			})}
			<button className="flex-1 flex justify-center items-center border-r border-y border-[#dee0e1] dark:border-[#393839] h-11">
				<Image
					src={userImg}
					alt="Profile for User"
					className="w-6 h-6 rounded-full"
				/>
			</button>
		</div>
	);
}
