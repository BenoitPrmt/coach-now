import {Button} from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import {Booking} from "~/components/Booking/booking";

export function BookingDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Réserver</Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-auto">
                <Booking/>
            </DialogContent>
        </Dialog>
    )
}
