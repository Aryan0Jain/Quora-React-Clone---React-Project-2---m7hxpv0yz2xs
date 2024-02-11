import Login from "@/components/login-signup/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginComponent() {
	const session = await getServerSession();
	if (session) {
		redirect("/");
	} else {
		return <Login />;
	}
}
