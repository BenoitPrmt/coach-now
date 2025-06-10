import CoachesPage from "~/pages/Coachs";
import type {MetaArgs} from "react-router";

export function meta({}: MetaArgs) {
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
