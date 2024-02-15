"use server";

import { projectID } from "./utils";
export async function toggleVote(shouldUpVote, jwt, postID) {
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
		return { message: "success" };
	} catch (error) {
		return { message: "error" };
	}
}
