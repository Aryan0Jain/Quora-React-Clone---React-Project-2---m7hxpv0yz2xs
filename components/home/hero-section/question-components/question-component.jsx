"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import { useSession } from "next-auth/react";
import { projectID } from "@/lib/utils";
import dayjs from "dayjs";
import Upvote from "./upvote";
import DownVote from "./downvote";
import CommentIcon from "./comment-icon";
import imgPlaceholder from "@/assets/image-placeholder.jpg";
import { useDataContext } from "@/components/contexts/data-provider";
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
	const { reloadFollowing, setReloadFollowing, setDisplayMessageBox } =
		useDataContext();
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
		setReloadFollowing(true);
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
			setReloadFollowing(false);
		}
		if (status === "authenticated") getFollowing();
	}, [reloadFollowing]);
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
					<div className="relative max-w-[550px] max-h-[550px] bg-[#5f615f] dark:bg-[#5f615f]">
						{images.map((src, i) => {
							return (
								<Image
									key={i}
									src={src}
									alt={title}
									height={0}
									width={0}
									placeholder="blur"
									blurDataURL={imgPlaceholder.src}
									loading="lazy"
									// fill
									sizes="100vw"
									className="object-contain z-0 w-full h-auto"
								/>
							);
						})}
					</div>
					<div className="flex gap-2">
						<div className="flex rounded-full border dark:border-[#393839] bg-[#00000108] dark:bg-[#ffffff0d]">
							<button className="flex gap-2 px-2 py-1 items-center hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition">
								<Upvote
									className={
										"w-5 h-5 fill-none stroke-[#2e69ff]"
									}
								/>
								<span
									className={`text-[#636466] dark:text-[#b1b3b6] font-medium text-[13px]`}
								>
									Upvote
								</span>
								<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
								<span className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
									{likeCount}
								</span>
							</button>
							<div className="h-full border dark:border-[#393839]"></div>
							<button className="px-2 py-1 hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition">
								<DownVote
									className={
										"w-5 h-5 fill-none stroke-[#636466] dark:stroke-[#b1b3b6]"
									}
								/>
							</button>
						</div>
						<button className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0a]">
							<CommentIcon
								className={
									"w-5 h-5 stroke-[#636466] dark:stroke-[#b1b3b6]"
								}
							/>
							<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
								{commentCount}
							</div>
						</button>
					</div>
				</div>
			)}
		</>
	);
}
