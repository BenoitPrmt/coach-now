import type {LucideIcon} from "lucide-react";
import {DumbbellIcon} from "lucide-react";
import {PiBasketballBold} from "react-icons/pi";
import {FaPersonRunning} from "react-icons/fa6";
import {FaSwimmer} from "react-icons/fa";
import {TbPlayFootball} from "react-icons/tb";
import type {IconType} from "react-icons";

type Level = {
    name: string;
    key: string;
}

const levels: Level[] = [
    {
        name: "Débutant",
        key: "BEGINNER",
    },
    {
        name: "Intermédiaire",
        key: "MEDIUM",
    },
    {
        name: "Haut niveau",
        key: "HIGHLEVEL",
    }
]

export {levels};
export type { Level };
