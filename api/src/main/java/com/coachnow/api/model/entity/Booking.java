package com.coachnow.api.model.entity;

import com.coachnow.api.web.request.booking.BookingCreation;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startDate;

    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endDate;

    @Column(nullable = false)
    private Boolean isActive;

    @Column(nullable = false)
    private Float totalPrice;

    @ManyToOne
    @JoinColumn(name = "coach_id", referencedColumnName = "id", nullable = false)
    private Coach coach;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Override
    public String toString() {
        return "Booking{" +
                "id='" + id + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", isActive=" + isActive +
                ", totalPrice=" + totalPrice +
                ", coach=" + coach.getId() +
                ", user=" + user.getEmail() +
                '}';
    }

    public void setBookingWithBookingCreation(BookingCreation bookingData) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.startDate = formatter.parse(bookingData.getStartDate());
        this.endDate =  formatter.parse(bookingData.getEndDate());

        this.isActive = bookingData.getIsActive();
        this.totalPrice = bookingData.getTotalPrice();
    }
}
