"use client";
import Modal from "../common/modal";
import { RxCross2 } from "react-icons/rx";
import { FaRegImages } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRef, useState } from "react";
import { createASpace } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useDataContext } from "../contexts/data-provider";
export default function CreateSpace({ show, setShow }) {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const { data: session, status } = useSession();
	const { setReloadPosts } = useDataContext();
	const imagesInput = useRef();
	function filesBtnHandler(e) {
		setFiles([...e.target.files]);
	}
	function handleRemoveFile(index) {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	}
	function closeModal() {
		setShow(false);
	}
	async function addSpace() {
		const formData = new FormData();
		formData.append("name", title);
		setTitle("");
		if (description) {
			formData.append("description", description);
			setDescription("");
		}
		if (files.length > 0) {
			for (let file of files) formData.append("image", file);
			setFiles([]);
		}

		const data = await createASpace(session.user.jwt, formData);
		closeModal();
		setReloadPosts(true);
	}
	return (
		<Modal show={show} close={closeModal}>
			<div className="h-screen w-screen md:h-fit md:max-h-screen md:max-w-[600px] bg-white dark:bg-[#181818] rounded-lg p-6 flex flex-col items-start gap-2">
				<div className="w-full flex justify-between items-center">
					<button
						onClick={closeModal}
						className="rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#ffffff15] transition duration-300"
					>
						<RxCross2 size={24} />
					</button>
					<button
						disabled={title === "" || title.length < 2}
						onClick={addSpace}
						className="bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white font-medium p-3 rounded-full transition duration-300"
					>
						Create
					</button>
				</div>

				<div className="text-[18px] font-semibold mx-auto text-center">
					Create Space
				</div>
				<div className="w-full h-1 bg-[#2e69ff] rounded-t"></div>
				{/* <div className="p-3 w-full bg-[#ebf0ff] dark:bg-[#282d41] text-[#2e69ff] dark:text-[#4894fd] rounded-md text-[12px] sm:text-[15px]">
					<div className="font-bold">
						Tips on getting good answers quickly
					</div>
					<ul className="list-disc list-inside">
						<li>
							Make sure your question has not been asked already
						</li>
						<li>Keep your question short and to the point</li>
						<li>Double-check grammar and spelling</li>
					</ul>
				</div> */}
				<div className="w-full px-5 flex justify-between items-center">
					<div className="flex gap-3 items-center w-full">
						<label className="relative cursor-pointer">
							<input
								ref={imagesInput}
								type="file"
								className="absolute w-0 h-0"
								accept="image/*"
								onChange={filesBtnHandler}
							/>
							<FaRegImages size={24} />
						</label>
						<div className="flex gap-3 flex-wrap max-h-[100px] w-full overflow-y-scroll">
							{files.length === 0 && <div>No File Chosen</div>}
							{files.length > 0 &&
								files.map(({ name, lastModified }, index) => {
									return (
										<div
											key={lastModified}
											className="flex gap-1"
										>
											<div>{name}</div>
											<button
												onClick={() =>
													handleRemoveFile(index)
												}
											>
												<RiDeleteBin6Line />
											</button>
										</div>
									);
								})}
						</div>
					</div>
				</div>

				<label htmlFor="space-title" className="font-semibold">
					Space Title <span className="font-normal">(required)</span>:
				</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					id="space-title"
					className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300"
					placeholder="Enter The Space Title"
				/>
				<label htmlFor="space-content" className="font-semibold">
					Space Description :
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					id="space-content"
					rows={10}
					placeholder="Enter Description"
					className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff]  transition-all duration-300"
				/>
			</div>
		</Modal>
	);
}