import type {UserRole} from "~/types";
import {FaCrown, FaDumbbell, FaInfo, FaUser} from "react-icons/fa6";
import React from "react";

const ROLES = {
    COACH: "Coach",
    USER: "Utilisateur",
    ADMIN: "Administrateur",
    UNKNOWN: "Rôle inconnu"
}

function UserRoleBadge(props: { userRole: UserRole }) {
    return <div
        className="inline-flex px-3 py-1 bg-primary text-white dark:bg-primary dark:text-white rounded-full text-xs font-medium items-center"
    >
        {
            props.userRole === "COACH" ? (
                <FaDumbbell className="size-3 mr-1" title={ROLES[props.userRole]} />
            ) : props.userRole === "USER" ? (
                <FaUser className="size-3 mr-1" title={ROLES[props.userRole]} />
            ) : props.userRole === "ADMIN" ? (
                <FaCrown
                    className="size-3 mr-1" title={ROLES[props.userRole]} />
            ) : (
                <FaInfo className="size-3 mr-1" title={ROLES.UNKNOWN} />
            )
        }
        {ROLES[props.userRole] || ROLES.UNKNOWN}
    </div>;
}

export default UserRoleBadge;