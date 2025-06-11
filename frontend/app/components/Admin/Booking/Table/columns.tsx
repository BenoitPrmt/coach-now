import type {ColumnDef} from "@tanstack/react-table";
import type {Booking} from "~/types";
import {cn} from "~/lib/utils";
import {BadgeCheckIcon, BadgeXIcon, UserCircleIcon} from "lucide-react";
import CoachImage from "~/components/Coach/CoachImage";
import {displayDuration, formatDateWithTime, getDurationFromDate} from "~/lib/time";
import type {TimeDuration} from "~/types/Time";
import {BookingFormModal} from "~/components/Admin/Booking/BookingFormModal";
import {BookingDeleteModal} from "~/components/Admin/Booking/BookingDeleteModal";
import * as React from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "~/components/ui/hover-card";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";

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
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="cursor-pointer font-medium">
                            <CoachImage
                                src={row.original.coach.profilePictureUrl}
                                alt={`${row.original.coach.user.firstName} ${row.original.coach.user.lastName}`}
                                className={cn(
                                    "w-8 h-8 rounded-full object-cover shadow-sm",
                                )}
                            />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between gap-4">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{row.original.coach.user.firstName} {row.original.coach.user.lastName}</h4>
                                <p className="text-sm">
                                    {row.original.coach.user.email}
                                </p>
                                <Button variant="outline" className="mt-4">
                                    <UserCircleIcon/>
                                    <Link to={`/coach/${row.original.coach.id}`}>
                                        Voir le profil
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        ),
    },
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({row}) => (
            <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="text-sm hover:underline truncate w-32 text-left text-primary cursor-pointer font-medium">
                            {row.original.user.id}
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