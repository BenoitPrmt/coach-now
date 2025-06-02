package com.coachnow.api.controller;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.UserDTO;
import com.coachnow.api.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8000")
public class UserController {

    @Autowired UserService userService;

    @GetMapping("/users")
    public List<UserDTO> all() {
        List<User> users = userService.selectAll();
        List<UserDTO> listDTO = new ArrayList<UserDTO>();
        for(User user : users) {
            listDTO.add(new UserDTO(user));
        }
        return listDTO;
    }

    @GetMapping("/player/{id}")
    public UserDTO get(
            @PathVariable String id
    ) {
        return new UserDTO(userService.select(id));
    }

    @PostMapping("/player")
    public UserDTO create(@RequestBody User player) {
        return new UserDTO(userService.save(player));
    }

    @PutMapping("/player/{id}")
    public UserDTO create(@RequestBody User user, @PathVariable String id) {
        user.setId(id);
        return new UserDTO(userService.save(user));
    }

    @DeleteMapping("/player/{id}")
    public void deletePlayer(@PathVariable String id) {userService.delete(id);
    }

}