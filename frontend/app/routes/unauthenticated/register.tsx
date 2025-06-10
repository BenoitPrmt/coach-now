import type { MetaArgs } from "react-router";
import {default as RegisterPage} from "~/pages/Register";

export function meta({}: MetaArgs) {
    return [
        {title: "CoachNow - Créer un compte"},
        {
            name: "description",
            content: "Créez votre compte sur CoachNow pour accéder à nos services de coaching sportif en ligne et réserver vos séances.",
        },
    ];
}

export default function Register() {
    return <RegisterPage/>;
}
