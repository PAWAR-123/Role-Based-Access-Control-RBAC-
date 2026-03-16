package nit.controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {
    
    @GetMapping
    public ResponseEntity<?> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint. Everyone can access this!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/info")
    public ResponseEntity<?> publicInfo() {
        Map<String, String> response = new HashMap<>();
        response.put("appName", "Spring Boot JWT Auth Demo");
        response.put("version", "1.0.0");
        response.put("description", "This API demonstrates JWT authentication with role-based access");
        return ResponseEntity.ok(response);
    }
}