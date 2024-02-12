"use client";
import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";
export default function SearchBox() {
	const inputRef = useRef();
	const containerRef = useRef();
	function focusHandler(e) {
		containerRef.current.classList.remove("border-[#dee0e1]");
		containerRef.current.classList.add("border-[#2e69ff]");
		containerRef.current.classList.remove("dark:border-[#393839]");
		containerRef.current.classList.add("dark:border-[#2e69ff]");
		containerRef.current.classList.add(
			"dark:shadow-[0_0_0_2px_rgb(40,45,65)]"
		);
		containerRef.current.classList.add(
			"shadow-[0_0_0_2px_rgb(235,240,255)]"
		);
		containerRef.current.classList.add("w-72");
	}
	function blurHandler(e) {
		containerRef.current.classList.remove("border-[#2e69ff]");
		containerRef.current.classList.add("border-[#dee0e1]");
		containerRef.current.classList.remove("dark:border-[#2e69ff]");
		containerRef.current.classList.add("dark:border-[#393839]");
		containerRef.current.classList.remove(
			"dark:shadow-[0_0_0_2px_rgb(40,45,65)]"
		);
		containerRef.current.classList.remove(
			"shadow-[0_0_0_2px_rgb(235,240,255)]"
		);
		containerRef.current.classList.remove("w-72");
	}
	return (
		<div className="relative w-60 h-12 bg-white dark:bg-[#262626]">
			<div
				ref={containerRef}
				onClick={() => inputRef.current.focus()}
				className="absolute top-0 left-0 w-60 flex bg-white dark:bg-[#181818] m-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]"
			>
				<FiSearch
					size={16}
					className="text-[#939598] dark:text-[#8e9092]"
				/>
				<input
					ref={inputRef}
					onFocus={focusHandler}
					onBlur={blurHandler}
					className="outline-none bg-transparent text-[13px] w-full"
					placeholder="Search Quora"
				/>
			</div>
		</div>
	);
}
