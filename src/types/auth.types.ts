export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}