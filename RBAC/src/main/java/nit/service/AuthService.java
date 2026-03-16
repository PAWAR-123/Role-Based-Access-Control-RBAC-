package nit.service;

import nit.dto.request.LoginRequest;
import nit.dto.request.RegisterRequest;
import nit.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}