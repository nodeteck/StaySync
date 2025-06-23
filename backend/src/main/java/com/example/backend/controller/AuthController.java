package com.example.backend.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.example.backend.dto.AuthRequest;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import com.example.backend.repositories.UserRepository;
import jakarta.validation.Valid;

import com.example.backend.JWTUtility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;  
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
 @RequestMapping("/api/v1/auth")
  public class AuthController {
    @Autowired  
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;



    public AuthController(UserService userService) {
        this.userService = userService;
    }

   @PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody AuthRequest authRequest) {
    if (userService.existsByUsername(authRequest.getUsername())) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("error", "Username already exists"));
    }

    User user = new User();
    user.setUsername(authRequest.getUsername());
    user.setPassword(authRequest.getPassword()); // You should encode the password if not already
    user.setRole("USER");
    user.setActive(true);

    User savedUser = userService.registerUser(user);

    Map<String, Object> response = Map.of(
            "id", savedUser.getId(),
            "username", savedUser.getUsername(),
            "role", savedUser.getRole(),
            "createdAt", savedUser.getCreatedAt()
    );

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
    // Authenticate user
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
    );

    // Load user details (assuming you have a UserDetailsService or similar)
    User user = userRepository.findByUsername(authRequest.getUsername())
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    // Generate JWT token
    String token = jwtUtil.generateToken(authRequest.getUsername());

    // Return username, userId, and token
    Map<String, Object> response = new HashMap<>();
    response.put("username", user.getUsername());
    response.put("userId", user.getId());  // assuming getId() returns user ID
    response.put("token", token);

    return ResponseEntity.ok(response);
}

}

