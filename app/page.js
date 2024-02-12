"use client";
import HeroSection from "@/components/home/hero-section/hero-section";
import SpacesSidebar from "@/components/home/spaces/spaces-sidebar";
import { useSession } from "next-auth/react";
export default function Home() {
	const { data: session, status } = useSession();
	// console.log(session);
	return (
		<div className="min-h-screen w-full md:w-2/3 mx-auto pt-[88px] md:pt-14">
			<div className="flex gap-5">
				<div className="hidden md:block">
					{/* Wrapped in div to make sidebar sticky */}
					<SpacesSidebar />
				</div>
				<HeroSection />
			</div>
		</div>
	);
}
