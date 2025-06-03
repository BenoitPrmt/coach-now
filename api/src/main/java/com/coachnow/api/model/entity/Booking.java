package com.coachnow.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private Boolean isActive;

    @Column(nullable = false)
    private Float totalPrice;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Coach coach;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
}
