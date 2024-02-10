import React from "react";
import { FiSearch } from "react-icons/fi";
export default function Search() {
	return (
		<div className="text-white self-center">
			<button className="flex gap-2 text-[14px] font-medium items-center">
				<FiSearch size={22} />
				Search
			</button>
		</div>
	);
}
