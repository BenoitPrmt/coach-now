package com.coachnow.api.component;

import com.coachnow.api.model.entity.Booking;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CsvGeneratorUtil {
    private static final String BOOKING_CSV_HEADER = "Date,Nom du coach,Nom de l'utilisateur,Prix\n";

    public StringBuilder generateCsvFile(String header) {
        StringBuilder csvContent = new StringBuilder();
        csvContent.append(header);
        return csvContent;
    }

    public byte[] generateCsv(List<Booking> bookingList) {
        StringBuilder csvContent = generateCsvFile(BOOKING_CSV_HEADER);

        for (Booking booking : bookingList) {
            csvContent.append(booking.getStartDate()).append(",")
                    .append(booking.getCoach().getUser().getFirstName()).append(" ")
                    .append(booking.getCoach().getUser().getLastName()).append(",")
                    .append(booking.getUser().getFirstName()).append(" ")
                    .append(booking.getUser().getLastName()).append(",")
                    .append(booking.getTotalPrice()).append("€\n");
        }

        return csvContent.toString().getBytes();
    }
}