import {ArrowRight, CalendarSyncIcon, CircleUserIcon, MedalIcon} from "lucide-react";
import {Link} from "react-router";
import React from "react";
import {Button} from "~/components/ui/button";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

            <div className="flex flex-row items-center gap-2 mb-4">
                <Button
                    variant="outline"
                    className="transition-colors cursor-pointer"
                    asChild
                >
                    <Link to={`/admin/users`}>
                        <CircleUserIcon/>
                        Gérer les utilisateurs
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    className="transition-colors cursor-pointer"
                    asChild
                >
                    <Link to={`/admin/coachs`}>
                        <MedalIcon />
                        Gérer les coachs
                    </Link>
                </Button>

                <Button
                    variant="outline"
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
    );
}
