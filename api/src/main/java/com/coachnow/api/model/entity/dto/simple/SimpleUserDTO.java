package com.coachnow.api.model.entity.dto.simple;

import com.coachnow.api.model.entity.User;
import lombok.Data;

@Data
public class SimpleUserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;

    public SimpleUserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
    }
}
