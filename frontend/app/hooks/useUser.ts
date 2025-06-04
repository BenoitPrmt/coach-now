import type {JwtPayload} from "jsonwebtoken";
import {userStore} from "~/store/userStore";
import {useEffect, useState} from "react";
import {useLocalStorage} from "~/hooks/useLocalStorage";
import {isOfTypeUserRole} from "~/validation/typesValidations";

type DecodedUser = JwtPayload & {
    name?: string;
    email?: string;
    role?: string;
};

export const useUser = () => {
    const [userToken] = useLocalStorage("jwt-coach-now", null);
    const user = userStore((state) => state.user);
    const setUser = userStore((state) => state.setUser);
    const clearUser = userStore((state) => state.clearUser);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        console.log("Décodage du token utilisateur:", userToken);

        if (userToken && typeof userToken === "string" && (userToken as string).trim() !== "") {
            try {
                const tokenString = userToken as string;
                const tokenParts = tokenString.split('.');

                if (tokenParts.length !== 3) {
                    throw new Error("Token JWT invalide - format incorrect");
                }

                const payload = tokenParts[1];
                const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
                const decodedUser = JSON.parse(atob(paddedPayload)) as DecodedUser;

                if (decodedUser.exp && Date.now() / 1000 > decodedUser.exp) {
                    console.log("Token expiré");
                    clearUser();
                    setIsLoading(false);
                    return;
                }

                console.log("Token utilisateur décodé:", decodedUser);

                setUser({
                    name: decodedUser.name || 'Guest',
                    email: decodedUser.email || '',
                    role: isOfTypeUserRole(decodedUser.role) ? decodedUser.role : 'USER',
                });
            } catch (error) {
                console.error("Failed to decode user token:", error);
                clearUser();
            }
        } else {
            clearUser();
        }

        setIsLoading(false);
    }, [userToken, setUser, clearUser]);

    return {
        user,
        signOut: clearUser,
        isLoading,
        isAuthenticated: !!user,
        isCoach: user?.role === 'COACH',
        isAdmin: user?.role === 'ADMIN',
    };
};