"use client";

import { createCalendar } from "@internationalized/date";
import {
	type CalendarProps,
	type DateValue,
	useCalendar,
} from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import { CalendarGrid } from "./calendar-grid";
import { CalendarHeader } from "./calendar-header";

type Props<T extends DateValue> = Omit<CalendarProps<T>, "visibleDuration"> & {
	coachId: string;
}

export function Calendar(props: Props<DateValue>) {
	const { locale } = useLocale();
	const state = useCalendarState({
		...props,
		visibleDuration: { months: 1 },
		locale,
		createCalendar,
	});

	const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
		props,
		state,
	);

	return (
		<div {...calendarProps} className="inline-block text-gray-800 dark:text-gray-200">
			<CalendarHeader
				state={state}
				calendarProps={calendarProps}
				prevButtonProps={prevButtonProps}
				nextButtonProps={nextButtonProps}
				coachId={props.coachId}
			/>
			<div className="flex gap-8">
				<CalendarGrid state={state} coachId={props.coachId} />
			</div>
		</div>
	);
}