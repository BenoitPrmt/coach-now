import {BookingDialog} from "~/components/Booking/BookingDialog";

type Props = {
    coachId: string;
}

const CoachProfile = ({coachId}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Profil du coach {coachId}</h1>
            </div>
            <div className="bg-gray-200 rounded-lg p-6 w-full">
                <BookingDialog />
            </div>
        </div>
    );
};

export default CoachProfile;