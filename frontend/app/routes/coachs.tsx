import type {Route} from "./+types/home";
import CoachesPage from "~/pages/Coachs";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "CoachNow - Nos Coachs"},
        {
            name: "description",
            content: "Découvrez nos coachs sportifs professionnels prêts à vous accompagner dans votre parcours de remise en forme.",
        },
    ];
}

export default function Coachs() {
    return <CoachesPage/>;
}
