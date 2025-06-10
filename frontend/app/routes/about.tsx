import type {Route} from "./+types/home";
import AboutPage from "~/pages/About";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "CoachNow - A propos"},
        {
            name: "description",
            content: "Découvrez CoachNow, votre plateforme de réservation de coach sportif en ligne. Apprenez-en plus sur notre mission, notre équipe et comment nous pouvons vous aider à atteindre vos objectifs de fitness."
        },
    ];
}

export default function About() {
    return <AboutPage/>;
}
