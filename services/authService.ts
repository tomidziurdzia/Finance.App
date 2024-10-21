import axios from "axios";
import Cookies from "js-cookie";

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
  lastname: string;
  email: string;
}

const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    if (response.data.token) {
      const user: User = {
        id: response.data.id,
        name: response.data.name,
        lastname: response.data.lastname,
        email: response.data.email,
      };
      // Guardar token y user en cookies
      Cookies.set("auth_token", response.data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    }
    return response.data.user;
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await axios.post(`${API_URL}/user/register`, credentials);
    if (response.data.token) {
      const user: User = {
        id: response.data.id,
        name: response.data.name,
        lastname: response.data.lastname,
        email: response.data.email,
      };
      // Guardar token y user en cookies
      Cookies.set("auth_token", response.data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    }
    return response.data.user;
  },

  logout() {
    // Eliminar token y user de las cookies
    Cookies.remove("auth_token");
    Cookies.remove("user");
  },

  getCurrentUser(): User | null {
    // Obtener el usuario de las cookies
    const userStr = Cookies.get("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getToken(): string | null {
    // Obtener el token de las cookies
    return Cookies.get("auth_token") || null;
  },
};

export default authService;
