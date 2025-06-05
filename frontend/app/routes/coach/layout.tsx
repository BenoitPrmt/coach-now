import {useUser} from "~/hooks/useUser";
import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";

export default function Layout() {
    let navigate = useNavigate();
    const {user, isCoach, isAdmin, isLoading} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
            return;
        }

        if (isLoading) {
            return;
        }

        if (!isCoach && !isAdmin) {
            navigate("/");
        }
    }, [isLoading, isCoach]);

    return !isLoading && isCoach ? (
        <Outlet />
    ) : (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-4xl mx-auto p-6">
                <p className="text-center">Chargement...</p>
            </div>
        </div>
    );
}
