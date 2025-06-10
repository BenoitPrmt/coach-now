import CoachProfile from "~/pages/CoachProfile";
import type {Route as RouteType} from "../../../../.react-router/types/app/+types/root";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "Profil - CoachNow"},
        {
            name: "description",
            content: "Découvrez le profil de votre coach sportif, ses spécialités, ses disponibilités et les avis de ses clients.",
        },
    ];
}

export default function CoachProfilePage({ params }: RouteType.ComponentProps) {
    if (!params.coachId) {
        throw new Response("Coach ID is required", { status: 400 });
    }
    return <CoachProfile coachId={params.coachId} />;
}
