package com.coachnow.api.controller;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.UserDTO;
import com.coachnow.api.model.service.UserService;
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
        List<UserDTO> listDTO = new ArrayList<UserDTO>();
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
    public UserDTO update(@RequestBody User user, @PathVariable String id) {
        user.setId(id);
        return new UserDTO(userService.save(user));
    }

    @DeleteMapping("/user/{id}")
    public void deletePlayer(@PathVariable String id) {
        userService.delete(id);
    }

}