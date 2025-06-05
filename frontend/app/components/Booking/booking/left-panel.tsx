import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4 } from "lucide-react";
import {useSearchParams} from "react-router";

export function LeftPanel({
	showForm,
	timeZone,
	setTimeZone,
}: {
	showForm: boolean | null;
	timeZone: string;
	setTimeZone: (timeZone: string) => void;
}) {
	const { locale } = useLocale();
	const [searchParams] = useSearchParams();

	const slotParam = searchParams.get("slot");

	console.log("LeftPanel slotParam", slotParam);

	return (
		<div className="flex flex-col gap-4 w-[280px] border-r pr-6">
			<div className="grid gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<img
							alt="Avatar"
							src="https://benoit.fun/me.jpg"
							className="rounded-full border"
							width={24}
							height={24}
						/>
					</TooltipTrigger>
					<TooltipContent>Benoît P.</TooltipContent>
				</Tooltip>
				<p className="text-gray-11 text-sm font-semibold">Benoît P.</p>
			</div>
			<div className="grid gap-3">
				<p className="text-gray-950 text-2xl font-bold">Cours</p>
				{showForm && (
					<div className="flex text-gray-950">
						<CalendarIcon className="size-4 mr-2" />
						<div className="flex flex-col text-sm font-semibold">
							<p>
								{new Date(slotParam as string).toLocaleString(locale, {
									dateStyle: "full",
								})}
							</p>
							<p>
								{new Date(slotParam as string).toLocaleString(locale, {
									timeStyle: "short",
								})}
							</p>
						</div>
					</div>
				)}
				<div className="flex items-center text-gray-950">
					<Clock4 className="size-4 mr-2" />
					<p className="text-sm font-semibold">30 mins</p>
				</div>
			</div>
		</div>
	);
}
