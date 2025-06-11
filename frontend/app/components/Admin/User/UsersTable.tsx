"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {EditIcon, TrashIcon} from "lucide-react"

import { Button } from "~/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {useEffect, useState} from "react";
import type {User} from "~/types";
import {getAllUsers} from "~/actions/user.action";
import {useUser} from "~/hooks/useUser";
import {UserFormModal} from "~/components/Admin/User/UserFormModal";
import UserRoleBadge from "~/components/Account/user/UserRoleBadge";
import {UserDeleteModal} from "~/components/Admin/User/UserDeleteModal";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "uuid",
        header: "UUID",
        cell: ({ row }) => (
            <div>{row.original.id}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => (
            <div>{row.original.firstName} {row.original.lastName}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div><UserRoleBadge userRole={row.original.role} /></div>
        ),
    },
    {
        accessorKey: "bookings",
        header: "Réservations",
        cell: ({ row }) => (
            <div>{row.original.bookings?.length}</div>
        ),
    },
    {
        accessorKey: "ratings",
        header: "Notes",
        cell: ({ row }) => (
            <div>{row.original.ratings?.length}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <UserFormModal mode="edit" user={row.original} />
                    <UserDeleteModal userId={row.original.id} />
                </div>
            )
        },
    },
]

export function UsersTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [users, setUsers] = useState<User[]>([]);

    const { userToken } = useUser();

    useEffect(() => {
        getAllUsers(userToken).then((data) => {
            if (data) {
                setUsers(data);
            }
        })
    }, [])

    const table = useReactTable({
        data: users,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Aucun résultat
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
