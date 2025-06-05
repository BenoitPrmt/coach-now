"use client";

import { Calendar } from "~/components/Booking/calendar";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
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

export function Booking() {
	const [isOpen, setIsOpen] = React.useState(false);
	const { locale } = useLocale();

	const [selectedDate, setSelectedDate] = useState<string | null>(new Date(Date.now()).toISOString().split("T")[0]);
	const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);

	const [timeZone, setTimeZone] = React.useState("America/New_York");
	const [date, setDate] = React.useState(today(getLocalTimeZone()));
	const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
		date,
	);

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
		const isPM = match[3] && match[3].toLowerCase() === "pm";

		if (isPM && (hours < 1 || hours > 12)) {
			console.error("Time out of range (1-12) in 12-hour format");
			return null;
		}

		if (isPM && hours !== 12) {
			hours += 12;
		} else if (!isPM && hours === 12) {
			hours = 0;
		}

		const currentDate = date.toDate(timeZone);
		currentDate.setHours(hours, minutes);

		setSelectedSlot(currentDate.toISOString());
	};

	const handleCancelForm = () => {
		console.log("handleCancelForm");
		setShowForm(false);
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
				<Button>
					<CalendarCheckIcon />
					Réserver
				</Button>
			</DialogTrigger>
			<DialogContent className="!max-w-none !w-fit max-w-[95vw] max-h-[90vh] overflow-auto p-0">
				<div className="w-full bg-gray-50 px-8 py-6 rounded-md max-w-max mx-auto">
					<div className="flex gap-6">
						<LeftPanel
							showForm={showForm}
							timeZone={timeZone}
							setTimeZone={setTimeZone}
							selectedDate={selectedDate}
							selectedSlot={selectedSlot}
						/>
						{!showForm ? (
							<>
								<Calendar
									minValue={today(getLocalTimeZone())}
									defaultValue={today(getLocalTimeZone())}
									value={date}
									onChange={handleChangeDate}
									onFocusChange={(focused: any) => setFocusedDate(focused)}
								/>
								<RightPanel
									{...{ date, timeZone, weeksInMonth, handleChangeAvailableTime }}
								/>
							</>
						) : (
							<FormPanel handleCancelForm={handleCancelForm} />
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}