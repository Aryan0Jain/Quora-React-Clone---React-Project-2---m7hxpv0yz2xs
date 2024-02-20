import React from "react";
import Modal from "../common/modal";
import { deleteASpace } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteSpace({
	showDeleteSpaceModal,
	closeDeleteSpaceModal,
	channelID,
}) {
	const { data: session } = useSession();
	const router = useRouter();
	async function handleDeleteSpace() {
		const data = await deleteASpace(session.user.jwt, channelID);
		if (data.message === "success") {
			router.push("/");
		}
	}
	return (
		<Modal show={showDeleteSpaceModal} close={closeDeleteSpaceModal}>
			<div className="p-6 rounded-lg bg-white flex flex-col gap-3 items-center">
				<div className="font-semibold text-[20px]">
					Do you want to delete this space?
				</div>
				<div className="flex gap-2 w-full justify-end">
					<button
						onClick={closeDeleteSpaceModal}
						className="rounded-full border-2 px-4 py-2 font-medium text-[#636466] hover:bg-[#00000010] transition"
					>
						Cancel
					</button>
					<button
						onClick={handleDeleteSpace}
						className="rounded-full border-2 border-[#2e69ff] px-4 py-2 font-medium bg-[#2e69ff] hover:bg-[#1a5aff] text-[#fff] transition"
					>
						Confirm
					</button>
				</div>
			</div>
		</Modal>
	);
}
