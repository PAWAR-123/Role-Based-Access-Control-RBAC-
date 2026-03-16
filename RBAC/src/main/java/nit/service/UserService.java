package nit.service;

import java.util.List;

import nit.dto.response.UserResponse;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse getCurrentUser(String email);
}