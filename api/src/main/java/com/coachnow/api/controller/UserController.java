package com.coachnow.api.controller;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.UserDTO;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.request.user.UserUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> all() {
        List<User> users = userService.selectAll();
        List<UserDTO> listDTO = new ArrayList<>();
        for (User user : users) {
            listDTO.add(new UserDTO(user));
        }
        return new ResponseEntity<>(listDTO, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> get(@PathVariable String id) {
        User user = userService.select(id);
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        UserDTO userDTO = new UserDTO(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<UserDTO> create(@RequestBody User user) {
        return new ResponseEntity<>(new UserDTO(userService.registerUser(user)), HttpStatus.CREATED);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserDTO> update(@RequestBody UserUpdate userUpdate, @PathVariable String id) {
        try {
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

            return new ResponseEntity<>(new UserDTO(existingUser), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/user/{id}")
    public void deletePlayer(@PathVariable String id) {
        userService.delete(id);
    }
}