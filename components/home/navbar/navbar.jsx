import DesktopNavbar from "./desktop/d-navbar";
import MobileNavbar from "./mobile/m-navbar";

export default function Navbar() {
	return (
		<div className="fixed bg-white dark:bg-[#262626] w-full h-12 shadow-[0_3px_6px_rgba(0,0,0,0.04)]">
			<DesktopNavbar />
			<MobileNavbar />
		</div>
	);
}
