"use server";

import { cookies } from "next/headers";
import { Category } from "@/interfaces/categoryInterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized access");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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

export async function getAllCategories(): Promise<Category[]> {
  return fetchWithAuth(`${API_URL}/categories`);
}

export async function getCategoryById(id: string): Promise<Category> {
  return fetchWithAuth(`${API_URL}/categories/${id}`);
}

export async function createCategory(
  category: Omit<Category, "id">
): Promise<Category> {
  return fetchWithAuth(`${API_URL}/categories`, {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export async function updateCategory(
  id: string,
  category: Partial<Category>
): Promise<Category> {
  return fetchWithAuth(`${API_URL}/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
}
