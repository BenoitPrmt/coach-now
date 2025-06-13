"use client";

import { Calendar } from "~/components/Booking/calendar";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent, DialogDescription, DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

import {
	type CalendarDate,
	getLocalTimeZone,
	getWeeksInMonth,
	today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import * as React from "react";
import { FormPanel } from "./form-panel";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";
import {CalendarCheckIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useBooking} from "~/hooks/useBooking";
import type {Coach} from "~/types";
import {useUser} from "~/hooks/useUser";
import {createBooking} from "~/actions/booking.action";
import {toast} from "sonner";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {formatDateTimeForAPI} from "~/lib/time";

type Props = {
	coach: Coach;
	buttonClassName?: string;
}

export function Booking({ coach, buttonClassName }: Props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const { locale } = useLocale();

	const [showForm, setShowForm] = useState(false);

	const [timeZone, setTimeZone] = useState(getLocalTimeZone());
	const [date, setDate] = useState(today(getLocalTimeZone()));
	const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(
		date,
	);

	const { user, userToken } = useUser();

	const { selectedDate, setSelectedDate, selectedSlot, setSelectedSlot, resetSelectedDate } = useBooking({
		coachId: coach.id,
	});

	useEffect(() => {
		if (!isOpen) {
			resetSelectedDate();
		}
	}, [isOpen]);

	const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

	const handleChangeDate = (date: DateValue) => {
		setDate(date as CalendarDate);
		setSelectedDate(date.toDate(timeZone).toISOString().split("T")[0]);
	};

	const handleChangeAvailableTime = (time: string) => {
		const timeValue = time.split(":").join(" ");

		const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
		if (!match) {
			console.error("Invalid time format");
			return null;
		}

		let hours = Number.parseInt(match[1]);
		const minutes = Number.parseInt(match[2]);

		const currentDate = date.toDate(timeZone);
		currentDate.setHours(hours, minutes);

		setSelectedSlot(currentDate.toISOString());
	};

	const handleCancelForm = () => {
		setShowForm(false);
	}

	const handleSubmitBooking = () => {
		setShowForm(false);
		setSelectedSlot(null);

		if (!userToken || !selectedSlot || !coach || !user) {
			console.error("Missing required data for booking:", { userToken, selectedSlot, coach, user });
			return;
		}

		const startDate = new Date(selectedSlot);
		const endDate = new Date(selectedSlot);

		startDate.setHours(startDate.getHours());
		endDate.setHours(endDate.getHours() + 1);

		createBooking(userToken, {
			startDate: formatDateTimeForAPI(startDate),
			endDate: formatDateTimeForAPI(endDate),
			isActive: true,
			totalPrice: coach.hourlyRate,
			coachId: coach.id,
			userId: user.id,
		}).then(() => {
			toast.success("Réservation créée avec succès !", {
				description: "Vous pouvez consulter vos réservations dans votre espace personnel.",
				action: {
					label: "Mon compte",
					onClick: () => {
						window.location.href = "/account";
					},
				}
			});
			setIsOpen(false);
			resetSelectedDate();
			window.location.reload();
		}).catch((error) => {
			console.error("Error creating booking:", error);
			toast.error("Une erreur est survenue lors de la création de la réservation.", {
				description: "Veuillez réessayer plus tard.",
			});
		})
	}

	useEffect(() => {
		setSelectedSlot(null);
	}, [selectedDate]);

	useEffect(() => {
		setShowForm(!!selectedDate && !!selectedSlot);
	}, [selectedSlot]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className={`w-full ${buttonClassName}`}>
					<CalendarCheckIcon />
					Réserver
				</Button>
			</DialogTrigger>
			<DialogContent className="!max-w-none !w-fit max-h-[90vh] overflow-auto p-0">
				<VisuallyHidden>
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</VisuallyHidden>
				<div className="w-full bg-gray-50 dark:bg-gray-900 px-8 py-6 rounded-md max-w-max mx-auto">
					<div className="flex gap-6 flex-col lg:flex-row">
						<LeftPanel
							showForm={showForm}
							timeZone={timeZone}
							setTimeZone={setTimeZone}
							coach={coach}
						/>
						{!showForm ? (
							<>
								<Calendar
									minValue={today(getLocalTimeZone())}
									defaultValue={today(getLocalTimeZone())}
									value={date}
									onChange={handleChangeDate}
									onFocusChange={(focused: any) => setFocusedDate(focused)}
									coachId={coach.id}
								/>
								<RightPanel
									{...{ date, timeZone, weeksInMonth, handleChangeAvailableTime }}
									coachId={coach.id}
								/>
							</>
						) : (
							<FormPanel handleCancelForm={handleCancelForm} handleSubmitBooking={handleSubmitBooking} />
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}