package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.types.Roles;
import com.coachnow.api.model.entity.dto.simple.SimpleRatingDTO;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Roles role;
    private List<BookingDTO> bookings;
    private List<SimpleRatingDTO> ratings;

    public String getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Roles getRole() {
        return role;
    }

    public List<BookingDTO> getBookings() {
        return bookings;
    }

    public List<SimpleRatingDTO> getRatings() {
        return ratings;
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.bookings = user.getBookings().stream()
                .map(BookingDTO::new)
                .toList();
        this.ratings = user.getRatings().stream()
                .map(SimpleRatingDTO::new)
                .toList();
    }

}
