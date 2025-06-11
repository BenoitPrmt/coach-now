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
import {calculateAverageRating} from "~/lib/calculations";
import CoachGender from "~/components/Coach/CoachGender";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "~/components/ui/hover-card";

export const columns: ColumnDef<Coach>[] = [
    {
        accessorKey: "profilePictureUrl",
        header: "",
        cell: ({ row }) => (
            <CoachImage
                src={row.original.profilePictureUrl}
                alt={`${row.original.user.firstName} ${row.original.user.lastName}`}
                className={cn(
                    "w-10 h-10 rounded-full object-cover shadow-sm",
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
        accessorKey: "user.firstName",
        header: "User",
        cell: ({ row }) => (
            <HoverCard>
                <HoverCardTrigger asChild>
                    <div className="text-sm hover:underline truncate w-32 text-left text-primary cursor-pointer font-medium">
                        {row.original.user.firstName} {row.original.user.lastName}
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <div className="flex justify-between gap-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{row.original.user.firstName} {row.original.user.lastName}</h4>
                            <p className="text-sm">
                                {row.original.user.email}
                            </p>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        ),
    },
    {
        accessorKey: "gender",
        header: "Sexe",
        cell: ({ row }) => <CoachGender gender={row.original.gender} />,
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
            <div>{calculateAverageRating(row.original.ratings)}</div>
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
                setCoachs(data.sort((a, b) => {
                    return a.user.firstName.localeCompare(b.user.firstName) || a.user.lastName.localeCompare(b.user.lastName);
                }));
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
