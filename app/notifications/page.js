"use client";

import { useDataContext } from "@/components/contexts/data-provider";
import { useEffect } from "react";

export default function Notifications() {
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	return (
		<>
			<div>Notifications</div>
			<div>Notifications</div>
			<div>Notifications</div>
			<div>Notifications</div>
			<div>Notifications</div>
		</>
	);
}
