import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  lastname: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data.user;
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await axios.post(`${API_URL}/user/register`, credentials);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data.user;
  },

  logout() {
    localStorage.removeItem("user");
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr).user;
    }
    return null;
  },

  getToken(): string | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr).token;
    }
    return null;
  },
};

export default authService;
