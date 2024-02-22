"use client";

import { useDataContext } from "../contexts/data-provider";

export default function GlobalLoader() {
	const { loadingGlobally } = useDataContext();

	return (
		loadingGlobally && (
			<div className="top-0 left-0 fixed z-[10000] w-screen h-screen bg-black/50 flex justify-center items-center">
				<div className="w-4 h-4 rounded-full bg-white shadow-[32px_0_rgb(255,255,255),-32px_0_rgb(255,255,255)] relative animate-pulse"></div>
			</div>
		)
	);
}
