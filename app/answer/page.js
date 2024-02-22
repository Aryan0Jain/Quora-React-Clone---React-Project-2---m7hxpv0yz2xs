"use client";

import { useDataContext } from "@/components/contexts/data-provider";
import { useEffect } from "react";

export default function Answer() {
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	return (
		<div>
			<div>adasds</div>
			<div>adasds</div>
			<div>adasds</div>
			<div>adasds</div>
			<div>adasds</div>
			<div>adasds</div>
			<div>adasds</div>
			<div>adasds</div>
		</div>
	);
}
