"use server";

import { Category } from "interfaces/categoryInterface";
import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.categories.getAll}`
    );
    return response as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories. Please try again later.");
  }
}

export async function getCategoryById(id: string): Promise<Category> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.categories.getById(id)}`
    );
    return response as Category;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw new Error("Failed to fetch category. Please try again later.");
  }
}

export async function createCategory(
  category: Omit<Category, "id">
): Promise<Category> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.categories.create}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );
    return response as Category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category. Please try again later.");
  }
}

export async function updateCategory(
  id: string,
  category: Partial<Category>
): Promise<Category> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.categories.putById(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );
    return response as Category;
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw new Error("Failed to update category. Please try again later.");
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await fetchWithAuth(`${API_URL}${apiUrls.categories.deleteById(id)}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw new Error("Failed to delete category. Please try again later.");
  }
}
