import api from './api';
import { RegisterRequest, LoginRequest, AuthResponse, ApiError } from '../types/auth.types';

export const authApi = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },
};