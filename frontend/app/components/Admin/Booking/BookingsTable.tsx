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
import type {Booking} from "~/types";
import {getAllBookings} from "~/actions/booking.action";
import {useUser} from "~/hooks/useUser";
import {BookingFormModal} from "~/components/Admin/Booking/BookingFormModal";
import {BookingDeleteModal} from "~/components/Admin/Booking/BookingDeleteModal";
import {cn} from "~/lib/utils";
import CoachImage from "~/components/Coach/CoachImage";
import {Badge} from "~/components/ui/badge";
import {displayDuration, formatDateWithTime, getDurationFromDate} from "~/lib/time";
import type {TimeDuration} from "~/types/Time";
import {BadgeCheckIcon, BadgeXIcon} from "lucide-react";

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "isActive",
        header: "Actif",
        cell: ({ row }) => (
            <Badge variant={row.original.isActive ? "success" : "destructive"}>
                {row.original.isActive ? <BadgeCheckIcon /> : <BadgeXIcon />}
            </Badge>
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
        accessorKey: "coach.profilePictureUrl",
        header: "Coach",
        cell: ({ row }) => (
            <CoachImage
                src={row.original.coach.profilePictureUrl}
                alt={`${row.original.coach.user.firstName} ${row.original.coach.user.lastName}`}
                className={cn(
                    "w-8 h-8 rounded-full object-cover shadow-sm",
                )}
            />
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
        accessorKey: "startDate",
        header: "Date",
        cell: ({ row }) => {
            const startDate = new Date(row.original.startDate);
            const isPast = startDate < new Date();
            return (
                <div className={cn(
                    "text-sm",
                    isPast ? "text-gray-500" : "text-gray-900"
                )}>
                    {formatDateWithTime(startDate)}
                </div>
            )
        },
    },
    {
        accessorKey: "duration",
        header: "Durée",
        cell: ({ row }) => {
            const duration: TimeDuration = getDurationFromDate(new Date(row.original.startDate), new Date(row.original.endDate))
            return (
                <div>{displayDuration(duration.hours, duration.minutes)}</div>
            )
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Prix total",
        cell: ({ row }) => (
            <div>{row.original.totalPrice}€</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <BookingFormModal mode="edit" booking={row.original} />
                    <BookingDeleteModal bookingId={row.original.id} />
                </div>
            )
        },
    },
]

export function BookingsTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [bookings, setBookings] = useState<Booking[]>([]);

    const { userToken } = useUser();

    useEffect(() => {
        getAllBookings(userToken).then((data) => {
            if (data) {
                setBookings(data.sort((a, b) => {
                    const dateA = new Date(a.startDate);
                    const dateB = new Date(b.startDate);
                    return dateB.getTime() - dateA.getTime();
                }));
            }
        })
    }, [])

    const table = useReactTable({
        data: bookings,
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
