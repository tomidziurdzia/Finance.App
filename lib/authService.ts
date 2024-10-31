import { apiUrls } from "@/lib/apiUrls";
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
    const response = await fetch(`${API_URL}/${apiUrls.auth.singin}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    if (data.token) {
      const user: User = {
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
      };
      if (typeof window !== "undefined") {
        document.cookie = `auth_token=${data.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;
        document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;
      }
    }
    return data.user;
  },

  logout() {
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await fetch(`${API_URL}/${apiUrls.auth.signup}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error("Registration failed");

    const data = await response.json();
    if (data.token) {
      const user: User = {
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
      };
      if (typeof window !== "undefined") {
        document.cookie = `auth_token=${data.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;
        document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;
      }
    }
    return data.user;
  },

  getCurrentUser(): User | null {
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("user=")
    );
    if (userCookie) {
      const userStr = userCookie.split("=")[1];
      try {
        return JSON.parse(decodeURIComponent(userStr));
      } catch {
        return null;
      }
    }
    return null;
  },

  getToken(): string | null {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth_token=")
    );
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
    return null;
  },
};

export default authService;
