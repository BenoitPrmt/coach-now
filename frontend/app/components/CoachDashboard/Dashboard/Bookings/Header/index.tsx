import React from 'react';
import {motion} from "motion/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {Button, buttonVariants} from "~/components/ui/button";
import {CalendarIcon, Goal, Rocket, TrashIcon} from "lucide-react";
import {cn} from "~/lib/utils";
import {COACH_CALENDAR as COACH_CALENDAR_CONSTANTS} from "~/constants";
import type {CoachCalendarDataType} from "~/types";

const {COACH_CALENDAR} = COACH_CALENDAR_CONSTANTS;

type Props = {
    startDate: CoachCalendarDataType | null;
    setStartDate: (date: CoachCalendarDataType | null) => void;
    endDate: CoachCalendarDataType | null;
    setEndDate: (date: CoachCalendarDataType | null) => void;
    view: "default" | "timeline";
    setView: (view: "default" | "timeline") => void;
    setSelectedBooking: (booking: null) => void;
}

const BookingsHeader = ({
                            startDate,
                            setStartDate,
                            endDate,
                            setEndDate,
                            view,
                            setView,
                            setSelectedBooking
                        }: Props) => {
    return (
        <div className="flex gap-2 flex-wrap items-center justify-center">
            <motion.div
                whileHover={{scale: 1.05}}
                whileTap={{scale: 1}}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="relative overflow-hidden hover:bg-secondary/90 dark:hover:bg-secondary/80"
                            variant="secondary"
                        >
                            <motion.span
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                            >
                                        <span className="flex items-center gap-2">
                                            <Rocket className="text-current"/>
                                            {startDate ? startDate.label : "Date de début"}
                                        </span>
                            </motion.span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-0 shadow-xl bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm">
                        <DropdownMenuLabel className="text-gray-700 dark:text-neutral-300 font-medium">
                            Sélection de la date de début
                        </DropdownMenuLabel>
                        {
                            startDate && (
                                <DropdownMenuItem
                                    onClick={() => {
                                        setStartDate(null);
                                        setSelectedBooking(null)
                                    }}
                                    variant="destructive"
                                >
                                    <TrashIcon
                                        className="w-4 h-4 mr-1 inline-block"
                                        aria-hidden="true"
                                    />
                                    Effacer la date de début
                                </DropdownMenuItem>
                            )
                        }
                        {
                            COACH_CALENDAR.filter(
                                (option) => option.type === "start"
                            ).map(
                                (option) => (
                                    <DropdownMenuItem
                                        key={option.label}
                                        onClick={() => setStartDate({
                                            label: option.label,
                                            value: option.value
                                        })}
                                        className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200"
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                )
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </motion.div>

            <motion.div
                whileHover={{scale: 1.05}}
                whileTap={{scale: 1}}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="relative overflow-hidden hover:bg-secondary/90 dark:hover:bg-secondary/80"
                            variant="secondary">
                            <motion.span
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                            >
                                        <span className="flex items-center gap-2">
                                            <Goal className="text-current"/>
                                            {endDate ? endDate.label : "Date de fin"}
                                        </span>
                            </motion.span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-0 shadow-xl bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm">
                        <DropdownMenuLabel className="text-gray-700 dark:text-neutral-300 font-medium">
                            Sélection d'une date de fin
                        </DropdownMenuLabel>
                        {
                            endDate && (
                                <DropdownMenuItem
                                    onClick={() => {
                                        setEndDate(null);
                                        setSelectedBooking(null)
                                    }}
                                    variant="destructive"
                                >
                                    <TrashIcon
                                        className="w-4 h-4 mr-1 inline-block"
                                        aria-hidden="true"
                                    />
                                    Effacer la date de fin
                                </DropdownMenuItem>
                            )
                        }
                        {
                            COACH_CALENDAR.filter((option) => option.type === "end").map(
                                (option) => (
                                    <DropdownMenuItem
                                        key={option.label}
                                        onClick={() => setEndDate({
                                            label: option.label,
                                            value: option.value
                                        })}
                                        className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                )
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </motion.div>

            <motion.div
                className={cn(buttonVariants({
                        variant: "default"
                    }), "flex items-center space-x-2 relative overflow-hidden hover:bg-primary/90 dark:hover:bg-primary/80 cursor-pointer",
                    view === "timeline"
                        ? "bg-primary text-white dark:bg-primary dark:text-white"
                        : "bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200"
                )}
                onClick={() => setView(view === "default" ? "timeline" : "default")}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 1}}
            >
                        <span className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" aria-hidden="true"/>
                            Vue Timeline
                        </span>
            </motion.div>
        </div>
    );
};

export default BookingsHeader;