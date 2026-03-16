import api from './api';
import { UserResponse } from '../types/user.types';

export const userApi = {
  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get<UserResponse>('/user');
    return response.data;
  },

  async getAllUsers(): Promise<UserResponse[]> {
    const response = await api.get<UserResponse[]>('/user/all');
    return response.data;
  },

  async getUserById(id: number): Promise<UserResponse> {
    const response = await api.get<UserResponse>(`/user/${id}`);
    return response.data;
  },

  // Admin endpoints
  async getAdminDashboard(): Promise<any> {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  async getPublicInfo(): Promise<any> {
    const response = await api.get('/public/info');
    return response.data;
  },
};