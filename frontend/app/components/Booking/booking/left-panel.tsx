import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4 } from "lucide-react";
import {useBooking} from "~/hooks/useBooking";
import type {Coach} from "~/types";

export function LeftPanel({
	showForm,
	timeZone,
	setTimeZone,
	coach
}: {
	showForm: boolean | null;
	timeZone: string;
	setTimeZone: (timeZone: string) => void;
	coach: Coach
}) {
	const { locale } = useLocale();

	const { selectedSlot } = useBooking({
		coachId: coach.id,
	});

	return (
		<div className="flex flex-col gap-4 w-[280px] pr-6 lg:border-r lg:border-gray-200 lg:dark:border-gray-700">
			<div className="grid gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<img
							alt="Avatar"
							src={coach.profilePictureUrl}
							className="rounded-full border border-gray-200 dark:border-gray-600"
							width={24}
							height={24}
						/>
					</TooltipTrigger>
					<TooltipContent>{coach.user.firstName} {coach.user.lastName}</TooltipContent>
				</Tooltip>
				<p className="text-gray-11 dark:text-gray-400 text-sm font-semibold">{coach.user.firstName} {coach.user.lastName}</p>
			</div>
			<div className="grid gap-3">
				<p className="text-gray-950 dark:text-gray-50 text-2xl font-bold">Cours</p>
				{showForm && (
					<div className="flex text-gray-950 dark:text-gray-100">
						<CalendarIcon className="size-4 mr-2" />
						<div className="flex flex-col text-sm font-semibold">
							<p>
								{new Date(selectedSlot as string).toLocaleString(locale, {
									dateStyle: "full",
								})}
							</p>
							<p>
								{new Date(selectedSlot as string).toLocaleString(locale, {
									timeStyle: "short",
								})}
							</p>
						</div>
					</div>
				)}
				<div className="flex items-center text-gray-950 dark:text-gray-100">
					<Clock4 className="size-4 mr-2" />
					<p className="text-sm font-semibold">1h</p>
				</div>
			</div>
		</div>
	);
}