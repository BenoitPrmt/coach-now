import {BookingFormModal} from "~/components/Admin/Booking/BookingFormModal";
import {BookingsTable} from "~/components/Admin/Booking/Table/BookingsTable";
import BookingExport from "~/components/Booking/BookingExport";

const BookingsPage = () => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center px-4 py-2">
                <h1 className="text-2xl font-bold">Gestion des réservations</h1>
                <div className="flex flex-row items-center gap-2">
                    <BookingFormModal mode="create" />
                    <BookingExport />
                </div>
            </div>
            <div className="flex pt-5 items-center justify-center">
                <BookingsTable />
            </div>
        </div>
    );
};

export default BookingsPage;