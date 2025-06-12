import type {Booking, TimelineDayType} from "~/types";
import TimelineDay from "~/components/CoachDashboard/Dashboard/Bookings/Timeline/TimeLineDay";


type Props = {
    timelineData: TimelineDayType[]
    selectedBooking: Booking | null;
    setSelectedBooking: (booking: Booking | null) => void;
}

const Timeline = ({
                      timelineData,
                      selectedBooking,
                      setSelectedBooking
                  }: Props) => {
    return (
        <div className="relative">
            <div
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30"></div>

            {timelineData.map((day) => (
                    <TimelineDay
                        key={day.date}
                        day={day}
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                    />
            ))}
        </div>
    );
};

export default Timeline;
