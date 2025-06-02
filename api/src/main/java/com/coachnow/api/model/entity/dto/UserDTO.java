package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.types.Roles;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {
    private String id;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private List<Roles> roles = new ArrayList<Roles>();

    public UserDTO(User user) {
        this.id = user.getId();
        this.first_name = user.getFirstName();
        this.last_name = user.getFirstName();
        this.email = user.getEmail();
        this.password = user.getPassword();

    }

}
