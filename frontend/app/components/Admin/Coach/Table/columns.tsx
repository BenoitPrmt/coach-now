import {
    type ColumnDef
} from "@tanstack/react-table";
import type {Coach} from "~/types";
import CoachImage from "~/components/Coach/CoachImage";
import {cn} from "~/lib/utils";
import CoachBadge from "~/components/Coach/CoachCard/CoachBadge";
import {CoachFormModal} from "~/components/Admin/Coach/CoachFormModal";
import {CoachDeleteModal} from "~/components/Admin/Coach/CoachDeleteModal";
import CoachGender from "~/components/Coach/CoachGender";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "~/components/ui/hover-card";

export const columns: ColumnDef<Coach>[] = [
    {
        accessorKey: "profilePictureUrl",
        header: "",
        cell: ({row}) => (
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
        cell: ({row}) => (
            <div className="text-sm truncate w-32">
                {row.original.id}
            </div>
        ),
    },
    {
        accessorKey: "user.firstName",
        header: "User",
        cell: ({row}) => (
            <HoverCard>
                <HoverCardTrigger asChild>
                    <div
                        className="text-sm hover:underline truncate w-32 text-left text-primary cursor-pointer font-medium">
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
        cell: ({row}) => <div className="flex justify-center items-center">
            <CoachGender gender={row.original.gender}/>
        </div>,
    },
    {
        accessorKey: "sports",
        header: "Sports",
        cell: ({row}) => (
            <div className="flex justify-center items-center">
                {
                    row.original.sports.map((sport, index) => (
                        <CoachBadge value={sport} className="mr-1 my-0.5" key={index}/>
                    ))
                }
            </div>
        ),
    },
    {
        accessorKey: "levels",
        header: "Niveaux",
        cell: ({row}) => (
            <div className="flex justify-center items-center">
                {
                    row.original.levels.map((level, index) => (
                        <CoachBadge value={level} className="mr-1 my-0.5" key={index}/>
                    ))
                }
            </div>
        ),
    },
    {
        accessorKey: "hourlyRate",
        header: "Taux Horaire",
        cell: ({row}) => (
            <div className="text-center">{row.original.hourlyRate}€ / h</div>
        ),
    },
    {
        accessorKey: "ratings",
        header: "Note moyenne",
        cell: ({row}) => (
            <div className="text-center">{row.original.ratings?.length}</div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <CoachFormModal mode="edit" coach={row.original}/>
                    <CoachDeleteModal coachId={row.original.id}/>
                </div>
            )
        },
    },
]
