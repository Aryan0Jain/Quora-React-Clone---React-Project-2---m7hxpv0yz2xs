"use client";
import { getUser, getUsersPosts, toggleFollow } from "@/lib/actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import Image from "next/image";
import Modal from "@/components/common/modal";
import Skills from "@/components/profile/skils";
import MoreSkills from "@/components/profile/more-skills";
import FollowSvg from "@/components/profile/follow-svg";
import FollowingSvg from "@/components/profile/following-svg";
import noPosts from "@/assets/end-of-page.webp";
import QuestionComponent from "@/components/home/hero-section/question-components/question-component";
import Link from "next/link";

export default function Profile({ params }) {
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [userData, setUserData] = useState({});
	const [showMoreHighlights, setShowMoreHighlights] = useState(false);
	const [posts, setPosts] = useState([]);
	function closeMoreHighlights() {
		setShowMoreHighlights(false);
	}
	async function loadUser() {
		setHasError(false);
		const data = await getUser(session.user.jwt, params.id);
		if (data.status === "success") {
			setUserData(data.data);
			document.title = data.data.name;
		}
		setLoading(false);
	}
	async function loadPosts() {
		setHasError(false);
		const data = await getUsersPosts(session.user.jwt, params.id);
		if (data.message === "success") {
			setPosts(data.posts);
		} else {
			setHasError(true);
		}
		setLoading(false);
	}
	const {
		address,
		createdAt,
		education,
		email,
		gender,
		isFollowed,
		name,
		paymentDetails,
		phone,
		profileImage,
		skills,
		updateAt,
		workExperience,
		_id,
	} = userData;

	async function handleFollowButtons() {
		// setLoading(true);
		try {
			const data = await toggleFollow(!isFollowed, session.user.jwt, _id);
		} catch (error) {}
		loadUser();
	}
	useEffect(() => {
		if (status === "authenticated" && loading === true) {
			loadUser();
			loadPosts();
		}
	}, [status, loading]);

	return (
		<div className="pt-[88px] md:pt-14 h-screen w-full bg-white">
			<div className="w-full md:w-9/12 mx-auto mt-5">
				{status === "loading" && loading && <div>Loading</div>}
				{status === "authenticated" && !loading && (
					<div className="flex flex-col">
						<div className="flex flex-col md:flex-row gap-2">
							<div className="flex gap-3 sm:gap-8 items-center flex-grow p-4">
								<div className="relative">
									<Image
										src={profileImage ?? userImg}
										width={120}
										height={120}
										className="object-cover rounded-full min-w-20"
										alt={`Profile Image for ${name}`}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<div className="font-bold text-xl sm:text-3xl capitalize">
										{name}
									</div>
									<div className="text-[14px] text-[#939598]">
										{email}
									</div>
									{session.user.id !== _id && (
										<div>
											{isFollowed ? (
												<button
													disabled={loading}
													onClick={
														handleFollowButtons
													}
													className="px-3 py-2 flex gap-1 items-center rounded-full transition border-[#2e69ff] text-[#2e69ff] shadow-[rgb(46,105,255)_0px_0px_0px_1px_inset] hover:bg-[#ebf0ff] disabled:opacity-35 disabled:hover:bg-white"
												>
													<div>
														<FollowingSvg className="stroke-[#2e69ff] fill-[#2e69ff]" />
													</div>
													<div>Following</div>
												</button>
											) : (
												<button
													disabled={loading}
													className="px-3 py-2 text-white flex gap-1 items-center bg-[#2e69ff] hover:bg-[#1a5aff] rounded-full transition disabled:opacity-35 disabled:hover:bg-[#2e69ff]"
													onClick={
														handleFollowButtons
													}
												>
													<div>
														<FollowSvg className="stroke-white h-5 w-5" />
													</div>
													<div>Follow</div>
												</button>
											)}
										</div>
									)}
								</div>
							</div>
							<div className="flex flex-col gap-2 flex-grow">
								<div className="border-b-2 pb-2 p-3 flex justify-between items-center">
									<div className="font-medium text-[#282829]">
										Credentials & Highlights
									</div>
									<button
										onClick={() =>
											setShowMoreHighlights(true)
										}
										className="text-[13px] text-[#939598] hover:underline"
									>
										More
									</button>
									<Modal
										show={showMoreHighlights}
										close={closeMoreHighlights}
									>
										<MoreSkills
											{...{
												closeMoreHighlights,
												workExperience,
												education,
												address,
												createdAt,
											}}
										/>
									</Modal>
								</div>
								<Skills
									{...{
										workExperience,
										education,
										address,
										createdAt,
									}}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-3 mt-4 w-full md:w-[550px] mb-4">
							<div className="text-xl font-semibold ml-3">
								Posts
							</div>
							{posts.length > 0 &&
								posts.map((data, i) => {
									return (
										<div
											key={i}
											className=" dark:border-[#262626] shadow-[0_0_10px_rgba(0,0,0,0.15)]"
										>
											<QuestionComponent {...data} />
										</div>
									);
								})}
							{!posts ||
								(posts.length === 0 && (
									<div className="flex flex-col items-center gap-3">
										<div className="relative w-28 h-28">
											<Image
												src={noPosts}
												alt="no posts found"
												fill
											/>
										</div>
										<div className="mx-4 text-center text-[#636466]">
											You haven't shared, answered or
											posted anything yet.
										</div>
										<Link
											href={"/answer"}
											className="px-3 py-2 rounded-full text-white bg-[#2e69ff] hover:bg-[#1a5aff] transition"
										>
											Answer questions
										</Link>
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
