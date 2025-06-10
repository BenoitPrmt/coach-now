import React from 'react';
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Dashboad - CoachNow"},
        {
            name: "description",
            content: "Gérez votre activité de coach sportif, consultez vos statistiques, gérez vos clients et planifiez vos séances.",
        },
    ];
}

export default function Dashboard() {
    return (
        <p>Dashboard</p>
    );
}