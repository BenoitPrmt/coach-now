import {useUser} from "~/hooks/useUser";
import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import Loader from "~/components/Loader";

export default function Layout() {
    let navigate = useNavigate();
    const {user, isCoach, isLoading} = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
            return;
        }

        if (isLoading) {
            return;
        }

        if (isCoach) {
            navigate("/");
        }
    }, [isLoading, isCoach]);

    return (!isLoading && !isCoach) ? (
        <Outlet/>
    ) : (
        <Loader/>
    );
}
