import {Button} from "~/components/ui/button";
import {BadgeCheckIcon} from "lucide-react";
import * as React from "react";

type Props = {
	handleCancelForm: () => void;
	handleSubmitBooking: () => void;
}

export function FormPanel({ handleCancelForm, handleSubmitBooking }: Props) {
	const handleCancel = () => {
		const queryParams = new URLSearchParams(location.search)
		queryParams.delete("slot");

		const newUrl = `${location.pathname}?${queryParams.toString()}`;
		window.history.pushState(null, '', newUrl);
		handleCancelForm();
	}

	return (
		<form className="flex flex-col gap-5 w-[360px]">

			<h2 className="text-gray-950 dark:text-gray-50 text-2xl font-bold">
				Confirmation de votre réservation
			</h2>

			<p className="text-gray-110 dark:text-gray-400 text-xs my-4">
				En réservant ce coach vous vous engagez à vous présenter à ce cours. Si vous souhaitez annuler, vous pouvez le faire dans les informations de votre réservation.
			</p>
			<div className="flex justify-end gap-2">
				<Button
					variant="outline"
					onClick={() => {
						handleCancel()
					}}
					type="button"
				>
					Retour
				</Button>
				<Button type="button" onClick={handleSubmitBooking}>
					<BadgeCheckIcon />
					Réserver ce coach
				</Button>
			</div>
		</form>
	);
}