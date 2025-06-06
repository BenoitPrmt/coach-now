import type { AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import type { CalendarState } from "@react-stately/calendar";
import type { DOMAttributes, FocusableElement } from "@react-types/shared";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./calendar-button";
import {useBooking} from "~/hooks/useBooking";

export function CalendarHeader({
	state,
	calendarProps,
	prevButtonProps,
	nextButtonProps,
}: {
	state: CalendarState;
	calendarProps: DOMAttributes<FocusableElement>;
	prevButtonProps: AriaButtonProps<"button">;
	nextButtonProps: AriaButtonProps<"button">;
}) {
	const monthDateFormatter = useDateFormatter({
		month: "long",
		year: "numeric",
		timeZone: state.timeZone,
	});

	const [monthName, _, year] = monthDateFormatter
		.formatToParts(state.visibleRange.start.toDate(state.timeZone))
		.map((part) => part.value);

	const { handleMonthChange } = useBooking({
		coachId: "304cad21-c1a2-456d-a1fe-6f3b5485aa5b",
	});

	const handleChange = (direction: "prev" | "next") => {
		if (direction === "prev") {
			state.focusPreviousPage();
		} else {
			state.focusNextPage();
		}
		handleMonthChange(direction);
	}

	return (
		<div className="flex items-center pb-4">
			<VisuallyHidden>
				<h2>{calendarProps["aria-label"]}</h2>
			</VisuallyHidden>
			{/* biome-ignore lint/a11y/useHeadingContent: <explanation> */}
			<h2
				aria-hidden
				className="flex-1 align-center font-bold text-md text-gray-950"
			>
				{monthName} <span className="text-gray-11">{year}</span>
			</h2>
			<Button {...prevButtonProps} onClick={() => handleChange("prev")}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button {...nextButtonProps} onClick={() => handleChange("next")}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</div>
	);
}
