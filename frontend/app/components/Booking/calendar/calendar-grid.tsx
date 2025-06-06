import {
	CalendarDate,
	type DateDuration,
	startOfMonth,
	endOfMonth,
	getWeeksInMonth,
} from "@internationalized/date";
import {useCalendarCell, useCalendarGrid} from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import type { CalendarState } from "@react-stately/calendar";
import { CalendarCell } from "./calendar-cell";
import {useBooking} from "~/hooks/useBooking";
import {useRef} from "react";

export function CalendarGrid({
	state,
	offset = {},
}: {
	state: CalendarState;
	offset?: DateDuration;
}) {
	const { locale } = useLocale();

	const { selectedDate, getAvailabilityByDate, dateToISOString } = useBooking({
		coachId: "304cad21-c1a2-456d-a1fe-6f3b5485aa5b",
	});

	// Set startDate (CalendarDate type) to the selected date
	const calendarDate = new CalendarDate(
		Number(selectedDate.split('-')[0]),
		Number(selectedDate.split('-')[1]),
		Number(selectedDate.split('-')[2]),
	)
	const startDate = startOfMonth(calendarDate);
	const endDate = endOfMonth(startDate);
	const { gridProps, headerProps, weekDays } = useCalendarGrid(
		{
			startDate,
			endDate,
			weekdayStyle: "short",
		},
		state,
	);

	// Get the number of weeks in the month so we can render the proper number of rows.
	const weeksInMonth = getWeeksInMonth(startDate, locale);

	return (
		<table {...gridProps} cellPadding="0" className="flex-1">
			<thead {...headerProps}>
				<tr>
					{weekDays.map((day, index) => (
						<th key={index} className="uppercase text-xs text-gray-11 pb-4">
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
					<tr key={weekIndex}>
						{state.getDatesInWeek(weekIndex, startDate).map((date, index) => {
							if (!date) {
								return <td key={index} />;
							}

							const availability = getAvailabilityByDate(dateToISOString(date.toDate("Europe/Paris")));
							// console.log("Availability for date:", date.toDate("Europe/Paris").toISOString(), availability);

							return (
								<CalendarCell
									key={index}
									state={state}
									date={date}
									currentMonth={startDate}
									availability={availability}
								/>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
