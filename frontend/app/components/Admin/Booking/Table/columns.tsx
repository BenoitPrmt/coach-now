import type {ColumnDef} from "@tanstack/react-table";
import type {Booking} from "~/types";
import {cn} from "~/lib/utils";
import {BadgeCheckIcon, BadgeXIcon} from "lucide-react";
import CoachImage from "~/components/Coach/CoachImage";
import {displayDuration, formatDateWithTime, getDurationFromDate} from "~/lib/time";
import type {TimeDuration} from "~/types/Time";
import {BookingFormModal} from "~/components/Admin/Booking/BookingFormModal";
import {BookingDeleteModal} from "~/components/Admin/Booking/BookingDeleteModal";
import * as React from "react";

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "isActive",
        header: () => {
            return (
                <span className="flex justify-center">Statut</span>
            )
        },
        cell: ({row}) => (
            <span
                className={cn("flex items-center justify-center", row.original.isActive ? "text-green-500" : "text-red-500")}>
                {row.original.isActive ? <BadgeCheckIcon className="size-4"/> : <BadgeXIcon className="size-4"/>}
            </span>
        ),
    },
    {
        accessorKey: "uuid",
        header: "UUID",
        cell: ({row}) => (
            <div className="text-sm truncate w-32">
                {row.original.id}
            </div>
        ),
    },
    {
        accessorKey: "coach.profilePictureUrl",
        header: "Coach",
        cell: ({row}) => (
            <div className="flex items-center justify-center">
                <CoachImage
                    src={row.original.coach.profilePictureUrl}
                    alt={`${row.original.coach.user.firstName} ${row.original.coach.user.lastName}`}
                    className={cn(
                        "w-8 h-8 rounded-full object-cover shadow-sm",
                    )}
                />
            </div>
        ),
    },
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({row}) => (
            <div className="text-sm truncate w-32">
                {row.original.user.id}
            </div>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Date",
        cell: ({row}) => {
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
        cell: ({row}) => {
            const duration: TimeDuration = getDurationFromDate(new Date(row.original.startDate), new Date(row.original.endDate))
            return (
                <div>{displayDuration(duration.hours, duration.minutes)}</div>
            )
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Prix total",
        cell: ({row}) => (
            <div>{row.original.totalPrice}€</div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <BookingFormModal mode="edit" booking={row.original}/>
                    <BookingDeleteModal bookingId={row.original.id}/>
                </div>
            )
        },
    },
]