import {userStore} from "~/store/userStore";
import {useEffect, useState} from "react";
import {useLocalStorage} from "~/hooks/useLocalStorage";

export const useUser = () => {
    const [userToken, setUserToken] = useLocalStorage("jwt-coach-now", null);
    const user = userStore((state) => state.user);
    const clearUser = userStore((state) => state.clearUser);
    const setUserFromToken = userStore((state) => state.setUserFromToken);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        console.log("User token:", userToken);

        if (userToken && typeof userToken === "string" && (userToken as string).trim() !== "") {
            setUserFromToken(userToken);
        } else {
            clearUser();
        }

        setIsLoading(false);
    }, [userToken, setUserFromToken, clearUser]);

    const signOut = () => {
        clearUser();
        setUserToken(null);
    }

    const setAuthToken = (token: string) => {
        setUserToken((token) => token);
        setUserFromToken(token);
    }

    return {
        user,
        userToken,
        signOut,
        setAuthToken,
        isLoading,
        isAuthenticated: !!user,
        isCoach: user?.role === 'COACH',
        isAdmin: user?.role === 'ADMIN',
    };
};