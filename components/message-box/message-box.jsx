"use client";
import { createPortal } from "react-dom";
import { useDataContext } from "../contexts/data-provider";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
export default function MessageBox() {
	const {
		displayMessageBox,
		setDisplayMessageBox,
		displayMessage,
		messageType,
	} = useDataContext();
	const bgColor = messageType === "success" ? "#2D9655" : "red";
	const messageClass = `${displayMessageBox ? "fixed" : "hidden"} ${
		messageType === "success" ? "bg-[#2d9655]" : "bg-[red]"
	}`;
	useEffect(() => {
		let id = setTimeout(() => {
			setDisplayMessageBox(false);
		}, 5000);
		return () => {
			clearTimeout(id);
		};
	});
	return (
		<div
			className={
				"z-50 top-[10%] py-1 px-2 shadow-[0_3px_6px_rgba(0,0,0,0.04)] rounded border left-1/2 flex gap-2 items-center max-w-[500px] transition-all duration-200" +
				" " +
				messageClass
			}
		>
			<div className="text-[13px] text-[#fff]">{displayMessage}</div>
			<button onClick={() => setDisplayMessageBox(false)}>
				<RxCross2 color="#fff" />
			</button>
		</div>
	);
}
