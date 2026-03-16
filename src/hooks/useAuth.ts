import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { userApi } from '../services/userApi';
import { AuthResponse, User } from '../types/auth.types';
import { getToken, setToken, removeToken, setUser, getUser, removeUser } from '../utils/tokenUtils';
import toast from 'react-hot-toast';


export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUserState] = useState<User | null>(getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      
      // Store token and user data
      setToken(response.token);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      setUserState({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      toast.success('Login successful!');
      navigate('/dashboard');
      return response;
    } catch (err: any) {
      const errorMessage = err.error || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.register({ name, email, password });
      
      // Store token and user data
      setToken(response.token);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      setUserState({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      toast.success('Registration successful!');
      navigate('/dashboard');
      return response;
    } catch (err: any) {
      const errorMessage = err.error || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userData = await userApi.getCurrentUser();
      setUserState(userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  useEffect(() => {
    if (getToken() && !user) {
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, user]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    fetchCurrentUser,
    isAuthenticated: !!user && !!getToken(),
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
  };
};