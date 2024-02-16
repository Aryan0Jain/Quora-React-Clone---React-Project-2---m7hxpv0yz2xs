"use client";
import Modal from "../common/modal";
import { RxCross2 } from "react-icons/rx";
import { FaRegImages } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRef, useState } from "react";
import { createAPost } from "@/lib/actions";
import { useSession } from "next-auth/react";
export default function CreatePost({ show, setShow }) {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const { data: session, status } = useSession();
	const imagesInput = useRef();
	function filesBtnHandler(e) {
		setFiles([...e.target.files]);
	}
	function handleRemoveFile(index) {
		const newFiles = files;
		newFiles.splice(index, 1);
		setFiles(newFiles);
	}
	function closeModal() {
		setShow(false);
	}
	async function addPost() {
		const formData = new FormData();
		formData.append("title", title);
		if (description) {
			formData.append("content", description);
		}
		if (files.length > 0) {
			for (let file of files) formData.append("images", file);
		}
		const data = await createAPost(session.user.jwt, formData);
		console.log(data);
	}
	return (
		<Modal show={show} close={closeModal}>
			<div className="h-screen w-screen md:h-fit md:max-w-[600px] bg-white rounded-lg p-4 flex flex-col items-start gap-2">
				<div className="w-full flex justify-between items-center">
					<button
						onClick={closeModal}
						className="rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)] transition duration-300"
					>
						<RxCross2 size={24} />
					</button>
					<button
						disabled={title === ""}
						onClick={addPost}
						className="bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white font-medium p-3 rounded-full transition duration-300"
					>
						Add Post
					</button>
				</div>

				<div className="text-[18px] font-semibold mx-auto text-center">
					Create Post
				</div>
				<div className="w-full h-1 bg-[#2e69ff] rounded-t"></div>
				<div className="p-3 w-full bg-[#ebf0ff] text-[#2e69ff] rounded-md">
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
				</div>
				<div className="w-full px-5 flex justify-between items-center">
					<div className="flex gap-3 items-center">
						<label className="relative cursor-pointer">
							<input
								ref={imagesInput}
								type="file"
								className="absolute w-0 h-0"
								multiple
								accept="image/*"
								onChange={filesBtnHandler}
							/>
							<FaRegImages size={24} />
						</label>
						<div className="flex gap-2 flex-wrap">
							{files.length === 0 && <div>No Files Chosen</div>}
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

				<label htmlFor="post-title" className="font-semibold">
					Post Title <span className="font-normal">(required)</span>:
				</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					id="post-title"
					className="w-full outline-none border-2 p-2 focus:border-[#2e69ff]"
					placeholder="Enter The Question or Title"
				/>
				<label htmlFor="post-content" className="font-semibold">
					Post Description :
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					id="post-content"
					rows={8}
					placeholder="Enter Description or Answer"
					className="w-full outline-none border-2 p-2 focus:border-[#2e69ff]"
				/>
			</div>
		</Modal>
	);
}
