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
export async function editAPost(jwt, formData, id) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/post/${id}`,
			{
				method: "PATCH",
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
export async function deletePost(jwt, postID) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/post/${postID}`,
			{
				method: "DELETE",
				headers: {
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return { message: "success" };
	}
}
export async function getUser(jwt, uid) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/user/${uid}`,
			{
				method: "GET",
				headers: {
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return { message: "error" };
	}
}
export async function toggleFollow(follow, jwt, id) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/follow/${id}`,
			{
				method: follow ? "POST" : "DELETE",
				headers: {
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return { message: "error" };
	}
}
export async function getUsersPosts(jwt, uid) {
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/quora/post?limit=10000",
			{
				method: "GET",
				headers: {
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		if (res.status === "success") {
			const posts = res.data.filter(({ author }) => {
				return author._id === uid;
			});
			return { posts, message: "success" };
		}
		return { message: "error" };
	} catch (error) {
		return { message: "error" };
	}
}
export async function getChannelData(id) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/channel/${id}`,
			{
				method: "GET",
				headers: {
					projectID: projectID,
				},
			}
		);
		const res = await data.json();
		if (res.status === "success")
			return { data: res.data, message: "success" };
		return { message: "fail" };
	} catch (error) {
		return { message: "error" };
	}
}

export async function getChannelPosts(id) {
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/quora/post?limit=10000",
			{
				method: "GET",
				headers: {
					projectID: projectID,
				},
			}
		);
		const res = await data.json();
		const posts = res.data.filter((item) => {
			return item.channel && item.channel._id === id;
		});

		return { message: "success", posts };
	} catch (error) {
		console.log(error.message);
		return { message: "error" };
	}
}
export async function createASpace(jwt, formData) {
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/quora/channel/",
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
export async function editASpace(jwt, channelID, formData) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/channel/${channelID}`,
			{
				method: "PATCH",
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
export async function deleteASpace(jwt, channelID) {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/channel/${channelID}`,
			{
				method: "DELETE",
				headers: {
					projectID: projectID,
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		const res = await data.json();
		return res;
	} catch (error) {
		return { message: "success" };
	}
}
export async function getSpaces() {
	try {
		const data = await fetch(
			`https://academics.newtonschool.co/api/v1/quora/channel?limit=1000`,
			{
				method: "GET",
				headers: {
					projectID: projectID,
				},
			}
		);
		const res = await data.json();
		if (res.status === "success") {
			return { message: "success", data: res.data };
		}
		return { message: "fail" };
	} catch (error) {
		return { message: "error" };
	}
}
