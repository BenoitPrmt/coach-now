import Homepage from "~/pages/Homepage";
import type {MetaArgs} from "react-router";

export function meta({}: MetaArgs) {
    return [
        {title: "CoachNow - Accueil"},
        {
            name: "description",
            content: "Bienvenue sur CoachNow, votre plateforme de réservation de coach sportif en ligne."
        },
    ];
}

export default function Home() {
    return <Homepage/>;
}
