import type {ColumnDef} from "@tanstack/react-table";
import type {User} from "~/types";
import UserRoleBadge from "~/components/Account/user/UserRoleBadge";
import {UserFormModal} from "~/components/Admin/User/UserFormModal";
import {UserDeleteModal} from "~/components/Admin/User/UserDeleteModal";
import * as React from "react";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "uuid",
        header: "UUID",
        cell: ({row}) => <div className="text-center text-sm truncate w-32">{row.original.id}</div>,
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({row}) => <div className="text-center">{row.original.firstName} {row.original.lastName}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div className="lowercase text-center">{row.original.email}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({row}) => <div className="flex justify-center items-center"><UserRoleBadge userRole={row.original.role}/></div>,
    },
    {
        accessorKey: "bookings",
        header: "Réservations",
        cell: ({row}) => <div className="text-center">{row.original.bookings?.length}</div>,
    },
    {
        accessorKey: "ratings",
        header: "Notes",
        cell: ({row}) => <div className="text-center">{row.original.ratings?.length}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <UserFormModal mode="edit" user={row.original}/>
                    <UserDeleteModal userId={row.original.id}/>
                </div>
            )
        },
    },
]