import type {Route} from "./+types/home";
import Homepage from "~/pages/Homepage";

export function meta({}: Route.MetaArgs) {
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
