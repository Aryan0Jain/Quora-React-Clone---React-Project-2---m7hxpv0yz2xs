export { default } from "next-auth/middleware";
export const config = {
	matcher: [
		"/",
		"/following/:path*",
		"/answer/:path*",
		"/spaces/:path*",
		"/notifications/:path*",
	],
};
