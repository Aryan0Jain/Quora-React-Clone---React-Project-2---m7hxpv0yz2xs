import { IoIosInformationCircleOutline } from "react-icons/io";
export default function ErrorBox({ message }) {
	return (
		<div className="text-[#cb4b10] text-[14px] font-medium flex gap-3 items-center mt-1">
			<IoIosInformationCircleOutline size={20} /> {message}
		</div>
	);
}
