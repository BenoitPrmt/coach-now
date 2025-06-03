package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.types.Roles;
import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private Roles role;

    public UserDTO(User user) {
        this.id = user.getId();
        this.first_name = user.getFirstName();
        this.last_name = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
    }

}
