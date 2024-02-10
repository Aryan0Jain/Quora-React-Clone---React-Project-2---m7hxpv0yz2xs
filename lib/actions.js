"use server";

import { projectID } from "./utils";

export async function login(email, password) {
	const body = {
		email: email,
		password: password,
		appType: "quora",
	};
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/user/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
				body: JSON.stringify(body),
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return { mesaage: "Some Error Occured. Please try again later." };
	}
}
export async function signup(name, email, password) {
	const body = {
		name: name,
		email: email,
		password: password,
		appType: "quora",
	};
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/user/signup",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
				body: JSON.stringify(body),
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return {
			mesaage: "Some Error Occured. Please try again later.",
			error: true,
		};
	}
}
