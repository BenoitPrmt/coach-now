import React from 'react';
import {Button} from "~/components/ui/button";
import {FileDownIcon, FileSpreadsheetIcon} from "lucide-react";
import type {ExportFormat} from "~/types";
import {exportBookings} from "~/actions/booking.action";
import {useUser} from "~/hooks/useUser";

type Props = {
    coachId?: string;
}

const BookingExport = ({ coachId }: Props) => {

    const { userToken } = useUser();

    const handleExport = (format: ExportFormat) => {
        exportBookings(userToken, format, coachId).then((result) => {
            if (format === 'csv') {
                const blob = new Blob([result], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `bookings.${format.toLowerCase()}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (format === 'pdf') {
                const blob = new Blob([result], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }
        })
    };

    return (
        <div className="isolate flex -space-x-px">
            <Button variant="outline" className="rounded-r-none focus:z-10" onClick={() => handleExport('csv')}>
                <FileSpreadsheetIcon />
                CSV
            </Button>
            <Button variant="outline" className="rounded-l-none focus:z-10" onClick={() => handleExport('pdf')}>
                <FileDownIcon />
                PDF
            </Button>
        </div>
    );
};

export default BookingExport;