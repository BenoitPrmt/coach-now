import type {UserRole} from "~/types";
import {FaCrown, FaDumbbell, FaInfo, FaUser} from "react-icons/fa6";
import React from "react";

function UserRoleBadge(props: { userRole: UserRole }) {
    return <div
        className="inline-flex px-3 py-1 bg-primary text-white dark:bg-primary dark:text-white rounded-full text-xs font-medium"
    >
        {
            props.userRole === "COACH" ? (
                <FaDumbbell className="w-4 h-4 mr-1" title="Coach"/>
            ) : props.userRole === "USER" ? (
                <FaUser className="w-4 h-4 mr-1" title="Utilisateur"/>
            ) : props.userRole === "ADMIN" ? (
                <FaCrown
                    className="w-4 h-4 mr-1" title="Administrateur"/>
            ) : (
                <FaInfo className="w-4 h-4 mr-1" title="Rôle inconnu"/>
            )
        }
        {props.userRole}
    </div>;
}

export default UserRoleBadge;