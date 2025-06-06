import {useUser} from "~/hooks/useUser";
import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import Loader from "~/components/Loader";

export default function Layout() {
    let navigate = useNavigate();
    const {user, isAdmin, isLoading} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
            return;
        }

        if (isLoading) {
            return;
        }

        if (!isAdmin) {
            navigate("/");
        }
    }, [isLoading, isAdmin]);

    return !isLoading && isAdmin ? (
        <Outlet />
    ) : (
        <div className="flex items-center justify-center h-screen">
            <Loader/>
        </div>
    );
}
