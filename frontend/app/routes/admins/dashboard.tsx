import {CalendarSyncIcon, CircleUserIcon, MedalIcon} from "lucide-react";
import {Link} from "react-router";
import React from "react";
import {Button} from "~/components/ui/button";

export default function Dashboard() {
    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Gestion des entités</h2>

                <div className="flex flex-row items-center gap-2 mb-4">
                    <Button
                        className="transition-colors cursor-pointer"
                        asChild
                    >
                        <Link to={`/admin/users`}>
                            <CircleUserIcon/>
                            Gérer les utilisateurs
                        </Link>
                    </Button>

                    <Button
                        className="transition-colors cursor-pointer"
                        asChild
                    >
                        <Link to={`/admin/coachs`}>
                            <MedalIcon />
                            Gérer les coachs
                        </Link>
                    </Button>

                    <Button
                        className="transition-colors cursor-pointer"
                        asChild
                    >
                        <Link to={`/admin/bookings`}>
                            <CalendarSyncIcon />
                            Gérer les réservations
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
