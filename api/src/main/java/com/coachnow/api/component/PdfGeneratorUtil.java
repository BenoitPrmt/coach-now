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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class PdfGeneratorUtil {
    public static final String OUTFIT_REGULAR = "src/main/resources/fonts/Outfit-Regular.ttf";
    public static final String OUTFIT_BOLD = "src/main/resources/fonts/Outfit-Bold.ttf";
    public static final String OUTFIT_EXTRABOLD = "src/main/resources/fonts/Outfit-ExtraBold.ttf";

    public byte[] generatePdf(List<Booking> bookingList, String documentTitle) throws DocumentException, IOException {

        BaseFont baseOutfitRegular = BaseFont.createFont(OUTFIT_REGULAR, BaseFont.WINANSI, BaseFont.EMBEDDED);
        Font outfitRegular = new Font(baseOutfitRegular, 12);

        BaseFont baseOutfitBold = BaseFont.createFont(OUTFIT_BOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
        Font outfitBold = new Font(baseOutfitBold, 14);

        BaseFont baseOutfitExtraBold = BaseFont.createFont(OUTFIT_EXTRABOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
        Font outfitExtraBold = new Font(baseOutfitExtraBold, 20);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            document.add(new Chunk(""));

            Paragraph title = new Paragraph(documentTitle, outfitExtraBold);
            title.setAlignment(Element.ALIGN_LEFT);
            document.add(title);

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            float[] columnWidths = {3f, 3f, 3f, 1f};
            table.setWidths(columnWidths);

            List<String> header = Arrays.asList("Date", "Nom du coach", "Nom de l'utilisateur", "Prix");
            header.stream().map((h) -> new Phrase(h, outfitBold))
                    .forEachOrdered((phrase) -> {
                        PdfPCell cell = new PdfPCell(phrase);
                        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                        table.addCell(cell);
                    });

            for (Booking booking : bookingList) {
                table.addCell(new Phrase(booking.getStartDate().toString(), outfitRegular));
                String coachName = booking.getCoach().getUser().getFirstName() + " " + booking.getCoach().getUser().getLastName();
                String userName = booking.getUser().getFirstName() + " " + booking.getUser().getLastName();
                table.addCell(new Phrase(coachName, outfitRegular));
                table.addCell(new Phrase(userName, outfitRegular));
                table.addCell(new Phrase(booking.getTotalPrice() + "€", outfitRegular));
            }

            document.add(table);

            Paragraph footer = new Paragraph("Powered by CoachNow", outfitRegular);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

        } catch (DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }

        return outputStream.toByteArray();
    }

    public Document addFooter(Document document) throws DocumentException {
        Paragraph footer = new Paragraph("Powered by CoachNow");
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);
        return document;
    }
}
