import {BookingFormModal} from "~/components/Admin/Booking/BookingFormModal";
import {BookingsTable} from "~/components/Admin/Booking/BookingsTable";

const BookingsPage = () => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center px-4 py-2">
                <h1 className="text-2xl font-bold">Gestion des réservations</h1>
                <BookingFormModal mode="create" />
            </div>
            <div className="flex pt-5 items-center justify-center">
                <BookingsTable />
            </div>
        </div>
    );
};

export default BookingsPage;