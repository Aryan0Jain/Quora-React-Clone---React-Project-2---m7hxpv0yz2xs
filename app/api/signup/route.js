import { projectID } from "@/lib/utils";

export async function GET(req) {
	return Response.json({ message: "got it" });
}
export async function POST(req) {
	const body = await req.json();
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/user/signup",
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
		if (res.message && res.message === "User already exists") {
			return Response.json({
				message: "User already exists",
			});
		}
		return Response.json({ message: "Successful" });
	} catch (error) {
		return Response.json({
			mesaage: "Some Error Occured. Please try again later.",
		});
	}
	return Response.json({ message: "got it" });
}
