package nit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import nit.entity.Role;
import nit.repository.RoleRepository;

@SpringBootApplication
public class RbacApplication implements CommandLineRunner {
	
    @Autowired
    private RoleRepository roleRepository;
    
    public static void main(String[] args){
 
        SpringApplication.run(RbacApplication.class, args);
        
    }
    
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setRoleName("USER");
            
            Role adminRole = new Role();
            adminRole.setRoleName("ADMIN");
            
            roleRepository.save(userRole);
            roleRepository.save(adminRole);
            
            System.out.println("Initial roles created: USER, ADMIN");
        }
    }
}