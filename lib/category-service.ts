import { Category } from "@/interfaces/categoryInterface";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token: string | null = null;

  const cookieStore = cookies();
  token = cookieStore.get("auth_token")?.value || null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    throw new Error("Unauthorized access");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

const categoryService = {
  async getAll(): Promise<Category[]> {
    return fetchWithAuth(`${API_URL}/categories`);
  },

  async getCategoryById(id: string): Promise<Category> {
    return fetchWithAuth(`${API_URL}/categories/${id}`);
  },

  async createCategory(category: Omit<Category, "id">): Promise<Category> {
    return fetchWithAuth(`${API_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(category),
    });
  },

  async updateCategory(
    id: string,
    category: Partial<Category>
  ): Promise<Category> {
    return fetchWithAuth(`${API_URL}/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
  },

  async deleteCategory(id: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });
  },
};

export default categoryService;
