package com.coachnow.api.component;

import com.coachnow.api.model.entity.Booking;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import org.springframework.stereotype.Component;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class PdfGeneratorUtil {
    public static final String OUTFIT_REGULAR = "src/main/resources/fonts/Outfit-Regular.ttf";
    public static final String OUTFIT_BOLD = "src/main/resources/fonts/Outfit-Bold.ttf";
    public static final String OUTFIT_EXTRABOLD = "src/main/resources/fonts/Outfit-ExtraBold.ttf";

    private static final BaseColor HEADER_COLOR = new BaseColor(230, 141, 86);

    private Font outfitRegular;
    private Font outfitBold;
    private Font outfitExtraBold;

    private void initializeFonts() throws DocumentException, IOException {
        BaseFont baseOutfitRegular = BaseFont.createFont(OUTFIT_REGULAR, BaseFont.WINANSI, BaseFont.EMBEDDED);
        outfitRegular = new Font(baseOutfitRegular, 11, Font.NORMAL);

        BaseFont baseOutfitBold = BaseFont.createFont(OUTFIT_BOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
        outfitBold = new Font(baseOutfitBold, 12, Font.BOLD);

        BaseFont baseOutfitExtraBold = BaseFont.createFont(OUTFIT_EXTRABOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
        outfitExtraBold = new Font(baseOutfitExtraBold, 22, Font.BOLD);
    }

    public byte[] generateBookingsPdf(List<Booking> bookingList, String documentTitle) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        document.setMargins(40, 40, 50, 50);

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            initializeFonts();

            addTitle(document, documentTitle);

            addBookingSummary(document, bookingList);
            addSpacing(document, 1);

            addBookingsTable(document, bookingList);
            addSpacing(document, 2);

        } finally {
            document.close();
        }

        return outputStream.toByteArray();
    }

    public void addTitle(Document document, String title) throws DocumentException {
        Paragraph titleParagraph = new Paragraph(title, outfitExtraBold);
        titleParagraph.setAlignment(Element.ALIGN_LEFT);
        document.add(titleParagraph);
        addSpacing(document, 1);
    }

    private void addBookingSummary(Document document, List<Booking> bookingList) throws DocumentException {
        PdfPTable summaryTable = new PdfPTable(2);
        summaryTable.setWidthPercentage(50);
        summaryTable.setHorizontalAlignment(Element.ALIGN_LEFT);

        addSummaryRow(summaryTable, "Nombre de réservations:", String.valueOf(bookingList.size()));

        document.add(summaryTable);
    }

    private void addSummaryRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = createCell(label, outfitBold, Element.ALIGN_LEFT);
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(5);

        PdfPCell valueCell = createCell(value, outfitRegular, Element.ALIGN_LEFT);
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(5);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    private void addBookingsTable(Document document, List<Booking> bookingList) throws DocumentException {
        PdfPTable table = createStyledTable(
                new String[]{"Date", "Coach", "Client", "Prix"},
                new float[]{2.5f, 3f, 3f, 1.5f}
        );

        for (Booking booking : bookingList) {
            String formattedDate = booking.getStartDate().toString();
            String coachName = formatFullName(booking.getCoach().getUser().getFirstName(),
                    booking.getCoach().getUser().getLastName());
            String userName = formatFullName(booking.getUser().getFirstName(),
                    booking.getUser().getLastName());
            String price = String.format("%.2f €", booking.getTotalPrice());

            table.addCell(createDataCell(formattedDate));
            table.addCell(createDataCell(coachName));
            table.addCell(createDataCell(userName));
            table.addCell(createDataCell(price));
        }

        document.add(table);
    }

    public PdfPTable createStyledTable(String[] headers, float[] columnWidths) throws DocumentException {
        PdfPTable table = new PdfPTable(headers.length);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);
        table.setWidths(columnWidths);

        for (String header : headers) {
            PdfPCell headerCell = createCell(header, outfitBold, Element.ALIGN_CENTER);
            headerCell.setBackgroundColor(HEADER_COLOR);
            headerCell.setPadding(12);
            headerCell.setBorderColor(BaseColor.WHITE);
            headerCell.setBorderWidth(1);

            Font whiteFont = new Font(outfitBold.getBaseFont(), 12, Font.BOLD, BaseColor.WHITE);
            headerCell.setPhrase(new Phrase(header, whiteFont));

            table.addCell(headerCell);
        }

        return table;
    }

    private PdfPCell createDataCell(String content) {
        PdfPCell cell = createCell(content, outfitRegular, Element.ALIGN_LEFT);
        cell.setPadding(10);
        cell.setBorderColor(new BaseColor(220, 220, 220));
        cell.setBorderWidth(0.5f);

        cell.setBackgroundColor(BaseColor.WHITE);

        return cell;
    }

    public PdfPCell createCell(String content, Font font, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(content, font));
        cell.setHorizontalAlignment(alignment);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        return cell;
    }

    public void addSpacing(Document document, float spacing) throws DocumentException {
        for (int i = 0; i < spacing; i++) {
            document.add(new Paragraph(" "));
        }
    }

    private String formatFullName(String firstName, String lastName) {
        return (firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "");
    }
}