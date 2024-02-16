import DarkThemeImg from "@/components/home/navbar/themes/dark-svg";
import LightThemeImg from "@/components/home/navbar/themes/light-svg";
import SytemThemeImg from "@/components/home/navbar/themes/system-svg";
import AnswerIcon from "@/components/nav-icons/answer-icon";
import AnswerIconFilled from "@/components/nav-icons/answer-icon-filled";
import FollowingIcon from "@/components/nav-icons/following-icon";
import FollowingIconFilled from "@/components/nav-icons/following-icon-filled";
import HomeIcon from "@/components/nav-icons/home-icon";
import HomeIconFilled from "@/components/nav-icons/home-icon-filled";
import NotificationIcon from "@/components/nav-icons/notification-icon";
import NotificationIconFilled from "@/components/nav-icons/notification-icon-filled";
import SpacesIcon from "@/components/nav-icons/spaces-icon";
import SpacesIconFilled from "@/components/nav-icons/spaces-icon-filled";
export function isValidEmail(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}
export const projectID = "8kb9c2pokhxg";

export const NAV_ICONS = [
	{
		path: "",
		Icon: HomeIcon,
		ActiveIcon: HomeIconFilled,
	},
	{
		path: "following",
		Icon: FollowingIcon,
		ActiveIcon: FollowingIconFilled,
	},
	{
		path: "answer",
		Icon: AnswerIcon,
		ActiveIcon: AnswerIconFilled,
	},
	{
		path: "spaces",
		Icon: SpacesIcon,
		ActiveIcon: SpacesIconFilled,
	},
	{
		path: "notifications",
		Icon: NotificationIcon,
		ActiveIcon: NotificationIconFilled,
	},
];
export const THEMES = [
	{ name: "Light", ThemeImage: LightThemeImg },
	{ name: "Dark", ThemeImage: DarkThemeImg },
	{
		name: "Auto",
		ThemeImage: SytemThemeImg,
		description:
			"Select this theme to apply your system settings if supported.",
	},
];

export const NAV_ICON_CLASS =
	"dark:fill-[#b1b3b6] fill-[#636466] hover:opacity-70 w-10 md:w-14 h-7 transition-opacity";
export const NAV_ICON_FILLED_CLASS =
	"fill-[#b92b27] hover:opacity-70 dark:fill-[#f52936] w-14 h-7 transition-opacity";
