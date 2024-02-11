"use client";
import { useSession } from "next-auth/react";
export default function Home() {
	const { data: session, status } = useSession();
	// console.log(session);
	return <div className="bg-[#F1F2F2]">{/* <Navbar /> */}</div>;
}
