"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HeroSectionLoader from "./hero-section-loader";
import Image from "next/image";
import userImg from "@/assets/default_user.webp";
import { projectID } from "@/lib/utils";
import PostComponent from "./post-component";
import QuestionComponent from "./question-components/question-component";
export default function HeroSection() {
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function loadPosts() {
			const data = await fetch(
				`https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${page}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
				}
			);
			const res = await data.json();
			// console.log(res);
			setPosts([...posts, ...res.data]);
			setLoading(false);
		}
		loadPosts();
	}, []);
	return (
		<div className="flex flex-col gap-2 mt-4 w-full md:w-[550px]">
			{loading && <HeroSectionLoader />}
			{!loading && (
				<>
					<PostComponent />
					{posts.map((data, i) => {
						return <QuestionComponent key={i} {...data} />;
					})}
				</>
			)}
		</div>
	);
}
