import { Category } from "../interfaces/categoryInterface";
import api from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get(`${API_URL}/categories`);

    return response.data;
  },
};

export default categoryService;
