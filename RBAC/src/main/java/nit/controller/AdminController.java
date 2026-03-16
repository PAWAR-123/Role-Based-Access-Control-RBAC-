package nit.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import nit.dto.response.UserResponse;
import nit.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<?> adminEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome Admin! You have access to all admin features.");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<?> adminDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", userService.getAllUsers().size());
        response.put("adminMessage", "This is admin dashboard");
        response.put("accessible", "Only ADMIN role can access this");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // Implement user deletion logic
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully (demo)");
        return ResponseEntity.ok(response);
    }
}