import type { MetaArgs } from "react-router";
import {default as LoginPage} from "~/pages/Login";

export function meta({}: MetaArgs) {
    return [
        {title: "CoachNow - Se connecter"},
        {
            name: "description",
            content: "Connectez-vous à CoachNow pour accéder à votre espace personnel et réserver vos séances de coaching sportif en ligne.",
        },
    ];
}

export default function Login() {
    return <LoginPage/>;
}
