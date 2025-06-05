import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { availableTimes } from "./available-times";

export function RightPanel({
	date,
	timeZone,
	weeksInMonth,
	handleChangeAvailableTime,
}: {
	date: DateValue;
	timeZone: string;
	weeksInMonth: number;
	handleChangeAvailableTime: (time: string) => void;
}) {
	const { locale } = useLocale();
	const [dayNumber, dayName] = date
		.toDate(timeZone)
		.toLocaleDateString(locale, {
			weekday: "short",
			day: "numeric",
		})
		.split(" ");
	return (
		<div
			defaultValue="24"
			className="flex flex-col gap-4 w-[280px] border-l pl-6"
		>
			<div className="flex justify-between items-center">
				<p
					aria-hidden
					className="flex-1 align-center font-bold text-md text-gray-950"
				>
					{dayName} <span className="text-gray-11">{dayNumber}</span>
				</p>
			</div>
			{["24"].map((time) => (
				<div key={time}>
					<ScrollArea
						type="always"
						className="h-full"
						style={{
							maxHeight: weeksInMonth > 5 ? "380px" : "320px",
						}}
					>
						<div className="grid gap-2 pr-3">
							{availableTimes.map((availableTime) => (
								<Button
									variant="outline"
									onClick={() =>
										handleChangeAvailableTime(
											availableTime[time as "24"],
										)
									}
									key={availableTime[time as "24"]}
								>
									{availableTime[time as "24"]}
								</Button>
							))}
						</div>
					</ScrollArea>
				</div>
			))}
		</div>
	);
}
