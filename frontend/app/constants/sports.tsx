import type {LucideIcon} from "lucide-react";
import {DumbbellIcon} from "lucide-react";
import {PiBasketballBold} from "react-icons/pi";
import {FaPersonBiking, FaPersonRunning} from "react-icons/fa6";
import {FaHorse, FaSwimmer} from "react-icons/fa";
import {TbPlayFootball, TbPlayHandball} from "react-icons/tb";
import type {IconType} from "react-icons";
import {BiSolidTennisBall} from "react-icons/bi";
import {MdSportsRugby} from "react-icons/md";
import {GiBoxingGlove} from "react-icons/gi";
import {GrYoga} from "react-icons/gr";

type Sport = {
    name: string;
    key: string;
    iconClass: string;
    badgeClass: string;
    icon: LucideIcon | IconType;
}

const SPORTS: Sport[] = [
    {
        name: "Fitness",
        key: "FITNESS",
        iconClass: "bg-blue-500 text-white",
        badgeClass: "bg-blue-500 text-white",
        icon: DumbbellIcon
    },
    {
        name: "Basketball",
        key: "BASKETBALL",
        iconClass: "bg-orange-500 text-white",
        badgeClass: "bg-orange-500 text-white",
        icon: PiBasketballBold
    },
    {
        name: "Cyclisme",
        key: "CYCLING",
        iconClass: "bg-purple-500 text-white",
        badgeClass: "bg-purple-500 text-white",
        icon: FaPersonBiking
    },
    {
        name: "Tennis",
        key: "TENNIS",
        iconClass: "bg-green-600 text-white",
        badgeClass: "bg-green-600 text-white",
        icon: BiSolidTennisBall
    },
    {
        name: "Rugby",
        key: "RUGBY",
        iconClass: "bg-red-500 text-white",
        badgeClass: "bg-red-500 text-white",
        icon: MdSportsRugby
    },
    {
        name: "Handball",
        key: "HANDBALL",
        iconClass: "bg-teal-500 text-white",
        badgeClass: "bg-teal-500 text-white",
        icon: TbPlayHandball
    },
    {
        name: "Boxe",
        key: "BOXING",
        iconClass: "bg-pink-500 text-white",
        badgeClass: "bg-pink-500 text-white",
        icon: GiBoxingGlove
    },
    {
        name: "Equitation",
        key: "HORSE_RIDING",
        iconClass: "bg-yellow-600 text-white",
        badgeClass: "bg-yellow-600 text-white",
        icon: FaHorse
    },
    {
        name: "Yoga",
        key: "YOGA",
        iconClass: "bg-indigo-500 text-white",
        badgeClass: "bg-indigo-500 text-white",
        icon: GrYoga
    },
    {
        name: "Course à pied",
        key: "RUNNING",
        iconClass: "bg-green-500 text-white",
        badgeClass: "bg-green-500 text-white",
        icon: FaPersonRunning
    },
    {
        name: "Natation",
        key: "SWIMMING",
        iconClass: "bg-cyan-500 text-white",
        badgeClass: "bg-cyan-500 text-white",
        icon: FaSwimmer
    },
    {
        name: "Football",
        key: "FOOTBALL",
        iconClass: "bg-yellow-500 text-white",
        badgeClass: "bg-yellow-500 text-white",
        icon: TbPlayFootball
    },
]

export {SPORTS};
export type { Sport };
