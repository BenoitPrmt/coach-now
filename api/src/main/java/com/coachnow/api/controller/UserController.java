package com.coachnow.api.controller;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.UserDTO;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.request.user.UserUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<UserDTO> all() {
        List<User> users = userService.selectAll();
        List<UserDTO> listDTO = new ArrayList<>();
        for (User user : users) {
            listDTO.add(new UserDTO(user));
        }
        return listDTO;
    }

    @GetMapping("/user/{id}")
    public UserDTO get(@PathVariable String id) {
        User user = userService.select(id);
        return user != null ? new UserDTO(user) : null;

    }

    @PostMapping("/user")
    public UserDTO create(@RequestBody User user) {
        return new UserDTO(userService.registerUser(user));
    }

    @PutMapping("/user/{id}")
    public UserDTO update(@RequestBody UserUpdate userUpdate, @PathVariable String id) {
        User existingUser = userService.select(id);

        if (existingUser == null) {
            throw new IllegalArgumentException("User with id " + id + " does not exist.");
        }

        if (userUpdate.getFirstName() != null) {
            existingUser.setFirstName(userUpdate.getFirstName());
        }
        if (userUpdate.getLastName() != null) {
            existingUser.setLastName(userUpdate.getLastName());
        }
        if (userUpdate.getRole() != null) {
            existingUser.setRole(userUpdate.getRole());
        }
        if (userUpdate.getPassword() != null && !userUpdate.getPassword().isEmpty()) {
            existingUser.setPassword(userUpdate.getPassword());
            userService.updateUserPassword(existingUser);
        } else {
            userService.save(existingUser);
        }

        return new UserDTO(existingUser);
    }

    @DeleteMapping("/user/{id}")
    public void deletePlayer(@PathVariable String id) {
        userService.delete(id);
    }

}