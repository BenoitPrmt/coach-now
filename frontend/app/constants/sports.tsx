import type {LucideIcon} from "lucide-react";
import {DumbbellIcon} from "lucide-react";

type Sport = {
    name: string;
    key: string;
    iconClass: string;
    badgeClass: string;
    icon: LucideIcon;
}
const sports: Sport[] = [
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
        icon: DumbbellIcon
    },
    {
        name: "Course à pied",
        key: "RUNNING",
        iconClass: "bg-green-500 text-white",
        badgeClass: "bg-green-500 text-white",
        icon: DumbbellIcon
    },
    {
        name: "Natation",
        key: "SWIMMING",
        iconClass: "bg-cyan-500 text-white",
        badgeClass: "bg-cyan-500 text-white",
        icon: DumbbellIcon
    },
    {
        name: "Football",
        key: "FOOTBALL",
        iconClass: "bg-yellow-500 text-white",
        badgeClass: "bg-yellow-500 text-white",
        icon: DumbbellIcon
    }
]

export {sports};