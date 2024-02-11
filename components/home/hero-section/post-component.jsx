import Image from "next/image";
import React from "react";
import userImg from "@/assets/default_user.webp";

export default function PostComponent() {
	return (
		<div className="bg-[#FFF] dark:bg-[#262626] border border-[#dee0e1] dark:border-[#262626] rounded">
			<div className="flex gap-2 px-2 py-2 items-center">
				<Image
					src={userImg}
					alt="Profile for User"
					className="w-8 h-8 rounded-full"
				/>
				<div className="rounded-full border border-[#dee0e1] dark:border-[#393839] bg-[#f7f7f8] dark:bg-[#202020] text-[#939598] cursor-pointer flex-grow py-1 px-2 hover:bg-[#f1f2f2] transition duration-200">
					What do you want to ask or share?
				</div>
			</div>
			<div className="h-10 flex items-center gap-2 px-5">
				<button className="flex-grow flex gap-2 items-center justify-center hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] rounded-full py-1 transition">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-[#636466] dark:stroke-[#b1b3b6] w-5 h-5"
					>
						<g strokeWidth="1.5" fill="none" fillRule="evenodd">
							<path
								d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
								// stroke="#666"
								strokeWidth={1.8}
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								fill="#666"
								d="m4.429 19.571 2.652-.884-1.768-1.768z"
							></path>
							<path
								d="M14.5 19.5h5v-5m-10-10h-5v5"
								// stroke="#666"
								strokeWidth={1.8}
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</g>
					</svg>
					<div className="text-[13px] text-[#636466] font-medium dark:text-[#b1b3b6]">
						Answer
					</div>
				</button>
				<div className="border h-3/6 dark:border-[#393839]"></div>
				<button className="flex-grow flex gap-2 items-center justify-center hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] rounded-full py-1 transition">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-[#636466] dark:stroke-[#b1b3b6] w-5 h-5"
					>
						<g fill="none" fillRule="evenodd">
							<path
								d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z"
								// stroke="#666"
								strokeWidth={1.8}
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								fill="#666"
								d="m4.429 19.571 2.652-.884-1.768-1.768z"
							></path>
						</g>
					</svg>
					<div className="text-[13px] text-[#636466] font-medium dark:text-[#b1b3b6]">
						Post
					</div>
				</button>
			</div>
		</div>
	);
}