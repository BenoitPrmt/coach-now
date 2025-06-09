import {useUser} from "~/hooks/useUser";
import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import Loader from "~/components/Loader";

export default function Layout() {
    let navigate = useNavigate();
    const {user, isAuthenticated, isLoading} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
            return;
        }

        if (isLoading) {
            return;
        }

        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isLoading, isAuthenticated]);

    return (!isLoading && isAuthenticated) ? (
        <Outlet/>
    ) : (
        <Loader/>
    );
}
