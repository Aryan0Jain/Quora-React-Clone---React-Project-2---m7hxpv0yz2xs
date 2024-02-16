"use server";

import { projectID } from "./utils";
export async function toggleUpVote(shouldUpVote, jwt, postID) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/like/${postID}`,
			{
				method: shouldUpVote ? "POST" : "DELETE",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		if (res.status === "success") return { message: "success" };
		else throw Error("failed");
	} catch (error) {
		return { message: "error" };
	}
}
export async function toggleDownVote(shouldDownVote, jwt, postID) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/dislike/${postID}`,
			{
				method: shouldDownVote ? "POST" : "DELETE",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		if (res.status === "success") return { message: "success" };
		else throw Error("failed");
	} catch (error) {
		return { message: "error" };
	}
}
export async function getPostDetail(jwt, postID) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/post/${postID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		if (res.status === "success") return res.data;
		else throw Error("failed");
		// return { message: "success" };
	} catch (error) {
		return { message: "error" };
	}
}
export async function createAPost(jwt, formData) {
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/quora/post/",
			{
				method: "POST",
				body: formData,
				headers: {
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return error;
	}
}
