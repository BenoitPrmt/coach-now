package com.coachnow.api.model.entity;

import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private Date birthdate;

    @Column(nullable = true)
    private String profilePictureUrl;

    @Column(nullable = false)
    private Float hourlyRate;

    @Column(nullable = false)
    private Set<Sports> sports;

    @Column(nullable = false)
    private Set<Level> levels;

    @Column(nullable = false)
    private Gender gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Override
    public String toString() {
        return "";
    }
}
