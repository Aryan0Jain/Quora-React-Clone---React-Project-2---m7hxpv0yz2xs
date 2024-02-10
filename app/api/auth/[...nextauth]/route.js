import { projectID } from "@/lib/utils";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions = {
// 	session: {
// 		strategy: "database",
// 		maxAge: 30 * 24 * 60 * 60,
// 	},
// 	pages: { signIn: "/login" },
// 	providers: [
// 		CredentialsProvider({
// 			credentials: { email: {}, password: {} },
// 			async authorize(credentials, req) {
// 				const { email, password } = credentials;
// 				const body = {
// 					email: email,
// 					password: password,
// 					appType: "quora",
// 				};
// 				try {
// 					const data = await fetch(
// 						"https://academics.newtonschool.co/api/v1/user/signup",
// 						{
// 							method: "POST",
// 							headers: {
// 								"Content-Type": "application/json",
// 								projectID: projectID,
// 							},
// 							body: JSON.stringify(body),
// 						}
// 					);
// 					const res = await data.json();
// 					// return res;
// 					if (
// 						res.message &&
// 						res.message === "Incorrect EmailId or Password"
// 					) {
// 						return Response.json({
// 							message: res.mesaage,
// 						});
// 					}
// 					return Response.json({ mesaage: "Succesful" });
// 				} catch (error) {
// 					return Response.json({
// 						mesaage: "Some Error Occured. Please try again later.",
// 					});
// 				}
// 				return { message: "Done" };
// 			},
// 		}),
// 	],
// };
const handler = NextAuth({
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: { signIn: "/login", signOut: "/login" },
	callbacks: {
		async jwt({ user, token }) {
			if (user.status && user.status === "success") {
				token.name = user.data.name;
				token.email = user.data.email;
				token.id = user.data._id;
				token.jwt = user.token;
			}
			return token;
		},
		// async signIn({ user }) {
		// 	if (user.status === "fail") return false;
		// 	return true;
		// },
		async session({ session, token, user }) {
			// console.log(props);
			session.user = { ...token };
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			async authorize(credentials, req) {
				const { email, password } = credentials;
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
					if (
						res.message &&
						res.message === "Incorrect EmailId or Password"
					) {
						return null;
					}
					return res;
				} catch (error) {
					return null;
					return {
						mesaage: "Some Error Occured. Please try again later.",
					};
				}
			},
		}),
	],
});
export { handler as GET, handler as POST };
