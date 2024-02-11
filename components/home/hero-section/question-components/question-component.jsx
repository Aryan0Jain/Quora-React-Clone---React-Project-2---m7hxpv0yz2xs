"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import { useSession } from "next-auth/react";
import { projectID } from "@/lib/utils";
import dayjs from "dayjs";
import Upvote from "./upvote";
import DownVote from "./downvote";

export default function QuestionComponent(data) {
	const { data: session, status } = useSession();
	// console.log(session, status);
	const {
		author,
		commentCount,
		content,
		createdAt,
		dislikeCount,
		images,
		likeCount,
		title,
		_id,
	} = data;
	const date = new dayjs(createdAt);
	const { name = "John Doe", profileImage, _id: aid } = author;
	const [following, setFollowing] = useState(false);
	async function toggleFollowing() {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/follow/${aid}`,
			{
				method: following ? "DELETE" : "POST",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
					Authorization: `Bearer ${session.user.jwt}`,
				},
			}
		);
		const res = await data.json();
		setFollowing((prev) => !prev);
		// console.log(res);
	}
	useEffect(() => {
		async function getFollowing() {
			const data = await fetch(
				`https://academics.newtonschool.co/api/v1/quora/user/${aid}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
						Authorization: `Bearer ${session.user.jwt}`,
					},
				}
			);
			const res = await data.json();
			// console.log(res);
			setFollowing(res.data.isFollowed);
		}
		if (status === "authenticated") getFollowing();
	});
	return (
		<>
			{status === "loading" && <div></div>}
			{status !== "loading" && (
				<div className="bg-[#FFF] dark:bg-[#262626] border border-[#dee0e1] dark:border-[#262626] rounded p-3 flex flex-col gap-1">
					<div className="flex gap-3">
						<Image
							src={profileImage ?? userImg}
							width={36}
							height={36}
							alt={`profile picture for ${name}`}
							className="rounded-full object-cover"
						/>
						<div>
							<div className="flex gap-2 items-center font-bold text-[13px]">
								<span className="text-[#282829] dark:text-[#d5d6d6]">
									{name}
								</span>
								<span className="bg-[#636466] w-[2px] h-[2px] rounded-full"></span>
								{session.user.id === aid && (
									<span className="text-[#2e69ff] font-medium">
										You
									</span>
								)}
								{session.user.id !== aid && (
									<button
										onClick={toggleFollowing}
										className="text-[#2e69ff] font-medium hover:underline"
									>
										{following ? "Unfollow" : "Follow"}
									</button>
								)}
							</div>
							<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
								{date.format("DD, MMMM YYYY")}
							</div>
						</div>
					</div>
					<div className="text-base font-bold">{title}</div>
					<div className="text-[15px]">{content}</div>
					<div className="flex">
						<div className="flex rounded-full border bg-[rgba(0,0,1,0.03)]">
							<button className="flex gap-2 px-2 py-1 items-center hover:bg-[rgba(0,0,0,0.03)] transition">
								<Upvote
									className={
										"w-5 h-5 fill-none stroke-[#2e69ff]"
									}
								/>
								<span
									className={`text-[#636466] font-medium text-[13px]`}
								>
									Upvote
								</span>
								<span className="bg-[#636466] w-[2px] h-[2px] rounded-full"></span>
								<span>10</span>
							</button>
							<div className="h-full border"></div>
							<button className="px-2 py-1 hover:bg-[rgba(0,0,0,0.03)] transition">
								<DownVote
									className={
										"w-5 h-5 fill-none stroke-[#636466]"
									}
								/>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
