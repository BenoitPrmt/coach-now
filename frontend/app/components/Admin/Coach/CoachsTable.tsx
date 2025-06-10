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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {useEffect, useState} from "react";
import type {Coach} from "~/types";
import {getAllCoachs} from "~/actions/coach.action";
import {useUser} from "~/hooks/useUser";
import {CoachFormModal} from "~/components/Admin/Coach/CoachFormModal";
import {CoachDeleteModal} from "~/components/Admin/Coach/CoachDeleteModal";
import CoachBadge from "~/components/Coach/CoachCard/CoachBadge";
import {cn} from "~/lib/utils";
import CoachImage from "~/components/Coach/CoachImage";

export const columns: ColumnDef<Coach>[] = [
    {
        accessorKey: "profilePictureUrl",
        header: "",
        cell: ({ row }) => (
            <CoachImage
                src={row.original.profilePictureUrl}
                alt={`${row.original.user.firstName} ${row.original.user.lastName}`}
                className={cn(
                    "w-12 h-12 rounded-full object-cover shadow-sm",
                )}
            />
        ),
    },
    {
        accessorKey: "uuid",
        header: "UUID",
        cell: ({ row }) => (
            <div className="text-sm truncate w-32">
                {row.original.id}
            </div>
        ),
    },
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ row }) => (
            <div className="text-sm truncate w-32">
                {row.original.user.id}
            </div>
        ),
    },
    {
        accessorKey: "gender",
        header: "Sexe",
        cell: ({ row }) => <div className="uppercase">{row.original.gender}</div>,
    },
    {
        accessorKey: "sports",
        header: "Sports",
        cell: ({ row }) => (
            row.original.sports.map((sport, index) => (
                <CoachBadge value={sport} className="mr-1 my-0.5" key={index}/>
            ))
        ),
    },
    {
        accessorKey: "levels",
        header: "Niveaux",
        cell: ({ row }) => (
            row.original.levels.map((level, index) => (
                <CoachBadge value={level} className="mr-1 my-0.5" key={index}/>
            ))
        ),
    },
    {
        accessorKey: "hourlyRate",
        header: "Taux Horaire",
        cell: ({ row }) => (
            <div>{row.original.hourlyRate}€ / h</div>
        ),
    },
    {
        accessorKey: "ratings",
        header: "Note moyenne",
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
                    <CoachFormModal mode="edit" coach={row.original} />
                    <CoachDeleteModal coachId={row.original.id} />
                </div>
            )
        },
    },
]

export function CoachsTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [coachs, setCoachs] = useState<Coach[]>([]);

    const { userToken } = useUser();

    useEffect(() => {
        getAllCoachs(userToken).then((data) => {
            if (data) {
                setCoachs(data);
            }
        })
    }, [])

    const table = useReactTable({
        data: coachs,
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

    table.getRowModel().rows.forEach((row) => {
        console.log(row)
    });

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
