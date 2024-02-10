import React from "react";
import { BsPlusCircle } from "react-icons/bs";
export default function AddPost() {
	return (
		<div className="text-white self-center">
			<button className="flex gap-2 text-[14px] font-medium items-center">
				<BsPlusCircle size={22} />
				Add
			</button>
		</div>
	);
}
