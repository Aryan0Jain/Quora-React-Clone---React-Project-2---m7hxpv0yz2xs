"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import Upvote from "./upvote";
import DownVote from "./downvote";
import CommentIcon from "./comment-icon";
import imgPlaceholder from "@/assets/image-placeholder.jpg";
import { useDataContext } from "@/components/contexts/data-provider";
import { getPostDetail, toggleDownVote, toggleUpVote } from "@/lib/actions";
export default function QuestionComponent(data) {
	const { data: session, status } = useSession();
	// console.log(session, status);
	const [postData, setPostData] = useState(data);
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
		isDisliked,
		isLiked,
	} = postData;
	// console.log(postData);
	const date = new dayjs(createdAt);
	const { name = "John Doe", profileImage, _id: aid } = author;
	const [loading, setLoading] = useState(true);
	const { setDisplayMessageBox } = useDataContext();

	async function handleUpvoteButton() {
		const data = await toggleUpVote(!isLiked, session.user.jwt, _id);
		reLoadPostData();
	}
	async function handleDownvoteButton() {
		const data = await toggleDownVote(!isDisliked, session.user.jwt, _id);
		reLoadPostData();
	}
	async function reLoadPostData() {
		const res = await getPostDetail(session.user.jwt, _id);
		setPostData(res);
	}
	useEffect(() => {
		if (status === "authenticated") {
			setLoading(false);
		}
	}, [status]);
	return (
		<>
			{status === "loading" ||
				(loading && (
					<div className="bg-[#FFF] dark:bg-[#262626] animate-pulse border border-[#dee0e1] dark:border-[#262626] rounded">
						<div className="h-11 flex px-2 gap-2 items-center">
							<div className="h-9 w-9 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
							<div className="flex flex-col gap-2 h-full w-full py-2">
								<div className="flex-grow w-1/4 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
								<div className="flex-grow w-10/12 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							</div>
						</div>
						<div className="h-44 flex flex-col px-2 gap-2 py-3">
							<div className="h-5 w-9/12 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							<div className="flex flex-col py-2 px-3 justify-between h-full">
								{Array.from({ length: 6 }).map((_, i) => {
									return (
										<div
											key={i}
											className="h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"
										></div>
									);
								})}
							</div>
						</div>
					</div>
				))}
			{status !== "loading" && !loading && (
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
								<span className="text-[#282829] dark:text-[#d5d6d6] capitalize">
									{name}
								</span>
								<span className="bg-[#636466] w-[2px] h-[2px] rounded-full"></span>
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
							<button
								onClick={handleUpvoteButton}
								className="flex gap-2 px-2 py-1 items-center hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition"
							>
								<Upvote
									className={
										"w-5 h-5 stroke-[#2e69ff] " +
										(isLiked
											? "fill-[#2e69ff]"
											: "fill-none")
									}
									style={{}}
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
							<button
								onClick={handleDownvoteButton}
								className="flex gap-2 px-2 py-1 items-center hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition"
							>
								<DownVote
									className={
										"w-5 h-5 dark:stroke-[#b1b3b6] " +
										(isDisliked
											? "fill-[#cb4b10] stroke-[#cb4b10] dark:stroke-[#cb4b10]"
											: "fill-none stroke-[#636466]")
									}
								/>
								<span
									className={`hidden sm:block text-[#636466] dark:text-[#b1b3b6] font-medium text-[13px]`}
								>
									Downvote
								</span>
								<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
								<span className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
									{dislikeCount}
								</span>
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
