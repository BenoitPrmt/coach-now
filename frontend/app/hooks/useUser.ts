import type {JwtPayload} from "jsonwebtoken";
import {userStore} from "~/store/userStore";
import {useEffect} from "react";
import {useLocalStorage} from "~/hooks/useLocalStorage";
import {isOfTypeUserRole} from "~/validation/typesValidations";

type DecodedUser = JwtPayload & {
    name?: string;
    email?: string;
    role?: string;
};

export const useUser = () => {
    const [userToken] = useLocalStorage("jwt-coach-now", null);
    const [user] = userStore((state) => [state.user, state.setUser]);

    useEffect(() => {
        if (userToken && typeof userToken === "string") {
            try {
                const payload = (userToken as string).split('.')[1];
                const decodedUser = JSON.parse(atob(payload)) as DecodedUser;

                if (decodedUser.exp && Date.now() / 1000 > decodedUser.exp) {
                    userStore.getState().clearUser();
                    return;
                }

                userStore.getState().setUser({
                    name: decodedUser.name || 'Guest',
                    email: decodedUser.email || '',
                    role: isOfTypeUserRole(decodedUser.role) ? decodedUser.role : 'USER',
                });
            } catch (error) {
                console.error("Failed to decode user token:", error);
                userStore.getState().clearUser();
            }
        } else {
            userStore.getState().clearUser();
        }
    }, [userToken]);

    return {
        user
    };
};