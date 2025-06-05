import {Button} from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

import { UserPlus, X } from "lucide-react";

import * as React from "react";
import {useNavigate} from "react-router";
import {toast} from "sonner";

type Guest = {
	email: string;
};

export function FormPanel() {
	let navigate = useNavigate();

	const handleBookCoach = () => {
		toast.success("Booking coach");
	}

	return (
		<form className="flex flex-col gap-5 w-[360px]">

			<h2 className="text-gray-950 text-2xl font-bold">
				Confirmation de votre réservation
			</h2>

			<p className="text-gray-110 text-xs my-4">
				En réservant ce coach vous vous engagez à vous présenter à ce cours. Si vous souhaitez annuler, vous pouvez le faire dans les informations de votre réservation.
			</p>
			<div className="flex justify-end gap-2">
				<Button
					variant="ghost"
					onClick={() => {
						navigate(-1);
					}}
				>
					Retour
				</Button>
				<Button type="button" onClick={handleBookCoach}>
					Réserver ce coach
				</Button>
			</div>
		</form>
	);
}
