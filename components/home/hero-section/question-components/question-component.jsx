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
import {
	deletePost,
	getComments,
	getPostDetail,
	postComment,
	toggleDownVote,
	toggleUpVote,
} from "@/lib/actions";
import Link from "next/link";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "@/components/common/modal";
import EditPost from "../../edit-post";
import Comment from "./comment";

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
		channel,
	} = postData;
	const date = new dayjs(createdAt);
	const { name = "John Doe", profileImage, _id: aid } = author;
	const [loading, setLoading] = useState(true);
	const { setDisplayMessageBox, setReloadPosts, startGlobalLoader } =
		useDataContext();
	const [
		showDeletePostConfirmationModal,
		setShowDeletePostConfirmationModal,
	] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCommentSection, setShowCommentSection] = useState(false);
	const [loadingComments, setLoadingComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	function openEditModal() {
		setShowEditModal(true);
	}
	function toggleComments() {
		if (showCommentSection) {
			setShowCommentSection(false);
		} else {
			setLoadingComments(true);
			setShowCommentSection(true);
		}
	}
	function handleLinkClick() {
		startGlobalLoader();
	}
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
		if (res.message === "success") setPostData(res.data);
	}
	function closeDeletePostModal() {
		setShowDeletePostConfirmationModal(false);
	}
	async function handleDeletePost() {
		closeDeletePostModal();
		const data = await deletePost(session.user.jwt, _id);
		if (data.message === "success") {
			setReloadPosts(true);
		}
	}
	async function fetchComments() {
		const data = await getComments(session.user.jwt, _id);
		if (data.message === "success") {
			setComments(data.data);
		}
		setLoadingComments(false);
	}
	async function handleAddComment(e) {
		e.preventDefault();
		if (comment.trim().length > 0) {
			const data = await postComment(
				session.user.jwt,
				_id,
				comment.trim()
			);
			if (data.message === "success") {
				setComment("");
				setLoadingComments(true);
			}
		}
	}
	useEffect(() => {
		if (status === "authenticated") {
			setLoading(false);
		}
	}, [status]);
	useEffect(() => {
		if (loadingComments) {
			fetchComments();
		}
	}, [loadingComments]);
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
				<div className="bg-[#FFF] dark:bg-[#262626] rounded p-3 flex flex-col gap-1">
					<div className="flex gap-3 items-center">
						<Image
							src={profileImage ?? userImg}
							width={36}
							height={36}
							alt={`profile picture for ${name}`}
							className="rounded-full object-cover w-7 h-7 md:h-9 md:w-9"
						/>
						<div>
							<div className="flex gap-2 items-center font-bold text-[13px]">
								<span className="text-[#282829] dark:text-[#d5d6d6] capitalize">
									{name}
								</span>
								<span className="bg-[#636466] w-[2px] h-[2px] rounded-full"></span>
								<Link
									href={`/profile/${aid}`}
									onClick={handleLinkClick}
								>
									<span className="text-[#2e69ff] hover:underline font-medium">
										View Profile
									</span>
								</Link>
							</div>
							{createdAt && (
								<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
									{date.format("DD, MMMM YYYY")}
								</div>
							)}
						</div>
						{session.user.id === aid && (
							<div className="ml-auto flex gap-1 md:gap-2">
								<button onClick={openEditModal}>
									<div className="transition-all p-2 duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] rounded-full">
										<MdEditNote className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
									</div>
								</button>
								<EditPost
									show={showEditModal}
									setShow={setShowEditModal}
									oldTitle={title}
									oldContent={content}
									postID={_id}
									images={images}
								/>
								<button
									onClick={() =>
										setShowDeletePostConfirmationModal(true)
									}
								>
									<div className="transition-all p-2 duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] rounded-full">
										<RiDeleteBinLine className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
									</div>
								</button>
								<Modal
									show={showDeletePostConfirmationModal}
									close={closeDeletePostModal}
								>
									<div className="p-6 rounded-lg bg-white dark:bg-[#181818] flex flex-col gap-3 items-center">
										<div className="font-semibold text-[20px]">
											Do you want to delete this post?
										</div>
										<div className="flex gap-2 w-full justify-end">
											<button
												onClick={closeDeletePostModal}
												className="rounded-full border-2 dark:border-[#262626] px-4 py-2 font-medium text-[#636466] dark:text-[#e2e2e2] hover:bg-[#00000010] dark:hover:bg-[#00000050] transition"
											>
												Cancel
											</button>
											<button
												onClick={handleDeletePost}
												className="rounded-full border-2 border-[#2e69ff] px-4 py-2 font-medium bg-[#2e69ff] hover:bg-[#1a5aff] text-[#fff] transition"
											>
												Confirm
											</button>
										</div>
									</div>
								</Modal>
							</div>
						)}
					</div>
					<Link
						href={`/posts/${_id}`}
						className="w-fit"
						onClick={handleLinkClick}
					>
						<div className="text-base font-bold hover:underline underline-offset-1">
							{title}
						</div>
					</Link>
					<div className="text-[15px]">{content}</div>
					<div className="relative max-w-[550px] bg-[#5f615f] dark:bg-[#5f615f]">
						{images.map((src, i) => {
							return (
								<div className="relative max-h-[550px]" key={i}>
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
										sizes="500px"
										className="object-contain z-0 w-full h-auto"
									/>
								</div>
							);
						})}
					</div>
					<div className="flex gap-2 mt-1">
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
						<button
							onClick={toggleComments}
							className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0a]"
						>
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
					{showCommentSection && (
						<>
							{loadingComments && <div>Loading</div>}
							{!loadingComments && (
								<div className="flex flex-col gap-1 mt-1">
									<div className="flex gap-2 items-center">
										<div className="h-8 w-8 relative">
											<Image
												src={userImg}
												alt="Profile picture for you"
												fill
												className="rounded-full"
												sizes="32px"
											/>
										</div>
										<form
											onSubmit={handleAddComment}
											className="flex flex-col sm:flex-row gap-2 flex-grow sm:items-center"
										>
											{/* <div className=""> */}
											<input
												className="outline-none w-full px-4 py-2 rounded-full border  dark:border-[#393839] focus:border-[#2e69ff] dark:focus:border-[#2e69ff] hover:border-[#2e69ff] dark:hover:border-[#2e69ff] flex-grow focus:shadow-[0_0_0_2px_rgb(40,45,65)]"
												placeholder="Add a comment..."
												value={comment}
												onChange={(e) =>
													setComment(e.target.value)
												}
											/>
											{/* </div> */}
											<button
												type="submit"
												className="hidden sm:block text-[13px] text-center flex-grow flex-shrink-0 sm:flex-grow-0 font-semibold px-3 py-2 rounded-full text-white bg-[#2e69ff] hover:bg-[#1a5aff] transition disabled:opacity-35 disabled:hover:bg-[#2e69ff]"
												disabled={
													comment.trim().length === 0
												}
											>
												Add Comment
											</button>
										</form>
									</div>
									{comments.map((item) => {
										return (
											<Comment
												key={item._id}
												item={item}
												isChild={false}
												setLoadingComments={
													setLoadingComments
												}
											/>
										);
									})}
								</div>
							)}
						</>
					)}
				</div>
			)}
		</>
	);
}
