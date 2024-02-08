/** @type {import('next').NextConfig} */
const nextConfig = {
	// experimental: {
	// 	serverActions: true,
	// },
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
	},
};

module.exports = nextConfig;
