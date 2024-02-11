"use client";

import Footer from "@/components/footer/footer";
import { projectID } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

export default function SpacesSidebar() {
	const [loading, setLoading] = useState(true);
	const [spaces, setSpaces] = useState([]);
	useEffect(() => {
		async function getSpaces() {
			const data = await fetch(
				"https://academics.newtonschool.co/api/v1/quora/channel?limit=8",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
				}
			);
			const res = await data.json();
			setSpaces(res.data);
			setLoading(false);
		}
		getSpaces();
	}, []);
	return (
		<div className="flex flex-col gap-2 mt-4">
			{loading &&
				Array.from({ length: 9 }).map((_, i) => {
					return (
						<div
							key={i}
							className="animate-pulse h-7 w-36 bg-slate-300 dark:bg-[#1b1b1b] rounded"
						></div>
					);
				})}
			{!loading && (
				<>
					<div className="w-36 p-2 bg-[#eceded] dark:bg-[#1b1b1b] rounded flex items-center cursor-pointer">
						<div className="flex items-center gap-2 mx-auto w-fit">
							<div className="bg-[#e6e7e8] dark:bg-[#262626] p-1 rounded">
								<GoPlus
									size={15}
									className="fill-[#636466] dark:fill-[#b1b3b6]"
								/>
							</div>
							<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
								Create Space
							</div>
						</div>
					</div>
					{spaces.map(({ _id, name, image }) => {
						return (
							<div
								key={_id}
								className="flex gap-2 items-center p-2 w-36 hover:bg-[#E4E6E6] dark:hover:bg-[#1D1D1D] cursor-pointer transition duration-200"
							>
								<Image
									src={image}
									width={20}
									height={20}
									alt={name}
									className="rounded"
								/>
								<div className="text-ellipsis overflow-hidden whitespace-nowrap w-24 text-[13px] text-[#636466] dark:text-[#b1b3b6]">
									{name}
								</div>
							</div>
						);
					})}
				</>
			)}
			<Footer />
		</div>
	);
}
