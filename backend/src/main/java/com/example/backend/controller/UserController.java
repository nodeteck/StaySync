package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.service.UserService;
import com.example.backend.dto.UserDTO;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/v1/")
public class UserController {
    @GetMapping("/greetisng")
    public String getGreeting() {
        return "Hello, World! hoho";
    }

    @Autowired
    private UserService userService;

    @GetMapping("/getUsesr")
    public List<UserDTO> getUser() {
        return userService.getAllUsers();
    }

}
