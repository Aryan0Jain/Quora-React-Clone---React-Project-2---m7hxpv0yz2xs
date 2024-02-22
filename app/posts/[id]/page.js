"use client";

import { useDataContext } from "@/components/contexts/data-provider";
import Advertisements from "@/components/home/advertisements/advertisements";
import QuestionComponent from "@/components/home/hero-section/question-components/question-component";
import { getPostDetail } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Post({ params }) {
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const [postData, setPostData] = useState();
	const { stopGlobalLoader } = useDataContext();
	async function fetchPost() {
		const data = await getPostDetail(session.user.jwt, params.id);
		if (data.message === "success") {
			setPostData(data.data);
		}
	}
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	useEffect(() => {
		async function loadPostData() {
			if (loading && status === "authenticated") {
				await fetchPost();
				setLoading(false);
			}
		}
		loadPostData();
	}, [loading, status]);
	return (
		<div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4">
			<div className="w-full md:w-9/12 mx-auto mt-5">
				{loading || (status === "loading" && <div>Loading</div>)}
				{!loading && status === "authenticated" && (
					// <div>ok</div>
					<div className="w-full flex gap-8">
						<div className="w-full md:max-w-[550px] border border-[#dee0e1] dark:border-[#262626]">
							<QuestionComponent {...postData} />
						</div>
						<div className="hidden lg:block sticky top-[72px]">
							<Advertisements className={"top-[78px]"} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
