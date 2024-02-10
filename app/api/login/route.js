import { projectID } from "@/lib/utils";

export async function GET(req) {
	return Response.json({ message: "got it" });
}
export async function POST(req) {
	const body = await req.json();
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/user/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
				body: JSON.stringify({ ...body, appType: "quora" }),
			}
		);
		const res = await data.json();

		console.log(res);
		if (res.message && res.message === "Incorrect EmailId or Password") {
			return Response.json({
				message: res.mesaage,
			});
		} else {
		}
		// return Response.json({ message: "Successful" });
	} catch (error) {
		return Response.json({
			mesaage: "Some Error Occured. Please try again later.",
		});
	}
	return Response.json({ message: "got it" });
}
