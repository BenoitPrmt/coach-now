import {useUser} from "~/hooks/useUser";
import type {ReactNode} from "react";

export const UserProvider = ({children}: { children: ReactNode }) => {
    const {user} = useUser();
    return (
        <>
            {children}
        </>
    );
}