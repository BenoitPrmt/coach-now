import { cn } from "~/lib/utils";
import {
	type CalendarDate,
	getLocalTimeZone,
	isSameMonth,
	isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import type {CoachAvailabilities} from "~/store/bookingStore";

export function CalendarCell({
	state,
	date,
	currentMonth,
    availability,
    isLoading
}: {
	state: CalendarState;
	date: CalendarDate;
	currentMonth: CalendarDate;
    availability?: CoachAvailabilities;
    isLoading?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
    const forceDisabled = availability && !availability.isWorkingDay;
	const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
		useCalendarCell({ date, isDisabled: forceDisabled }, state, ref);

	const isOutsideMonth = !isSameMonth(currentMonth, date);

	const isDateToday = isToday(date, getLocalTimeZone());

	const { focusProps, isFocusVisible } = useFocusRing();

	const isInactive = isDisabled || forceDisabled;

	const safeButtonProps = isInactive ? { tabIndex: -1, 'aria-disabled': true } : buttonProps;
	const safeFocusProps = isInactive ? {} : focusProps;

	return (
		<td
			{...cellProps}
			className={cn("py-0.5 relative px-0.5", isFocusVisible ? "z-10" : "z-0")}
		>
			<div
				{...mergeProps(safeButtonProps, safeFocusProps)}
				ref={ref}
				hidden={isOutsideMonth}
				className="size-14 outline-none group rounded-md"
				tabIndex={isInactive ? -1 : buttonProps.tabIndex}
				aria-disabled={isInactive || isLoading}
				data-disabled={isInactive ? true : undefined}
				onClick={isInactive ? undefined : buttonProps.onClick}
			>
				<div
					className={cn(
						"size-full rounded-md flex items-center justify-center",
						"text-gray-950 text-sm font-semibold",
						isInactive
							? isDateToday
								? "cursor-default"
								: "text-gray-400 cursor-default"
							: "cursor-pointer bg-gray-200",
						isFocusVisible &&
							"ring-1 group-focus:z-2 ring-gray-950 ring-offset-1",
						isSelected && "bg-gray-950 text-gray-100",
						!isSelected && (!isInactive) && "hover:ring-2 hover:ring-gray-950",
					)}
				>
					{isLoading ? (
						<div className="w-6 h-4 rounded bg-gray-200 animate-pulse" />
					) : (
						<>
							{formattedDate}
							{isDateToday && (
								<div
									className={cn(
										"absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-gray-950 rounded-full",
										isSelected && "bg-gray-100",
									)}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</td>
	);
}
