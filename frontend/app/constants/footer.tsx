import {BookOpen, Github, Heart, Mail} from "lucide-react";
import React from "react";

type Footer = {
    companyName: string;
    title: string;
    description: string;
    iconUrl: string;
    links: {
        icon: React.ReactNode;
        label: string;
        href: string;
        external?: boolean;
        isAvailable?: boolean;
    }[];
    socialNetworksLinks: {
        type: "Twitter" | "LinkedIn" | "Instagram",
        url: string;
        isAvailable?: boolean;
    }[]
}

const footer: Footer = {
    companyName: "CoachNow",
    title: "CoachNow",
    description: "Réservez votre coach sportif en ligne et atteignez vos objectifs de fitness !",
    iconUrl: "/icon.png",
    links: [
        {icon: <Heart className="h-5 w-5"/>, label: "Notre mission", href: "/about"},
        {
            icon: <Github className="h-5 w-5"/>,
            label: "Open Source",
            href: "https://github.com/Raxuis/CoachNow",
            external: true
        },
    ],
    socialNetworksLinks: []
}

export {
    footer
}