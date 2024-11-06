"use server";

import { Category } from "@/interfaces/categoryInterface";
import { apiUrls } from "@/lib/apiUrls";
import fetchWithAuth from "@/lib/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const CACHE_EXPIRATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, CacheItem<any>>();

function getCachedData<T>(key: string): T | null {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRATION) {
    return cachedItem.data;
  } else if (cachedItem) {
    cache.delete(key);
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export async function getAllCategories(): Promise<Category[]> {
  const cacheKey = "allCategories";
  const cachedCategories = getCachedData<Category[]>(cacheKey);

  if (cachedCategories) {
    return cachedCategories;
  }

  const categories = await fetchWithAuth(
    `${API_URL}${apiUrls.categories.getAll}`
  );
  setCachedData(cacheKey, categories);
  return categories;
}

export async function getCategoryById(id: string): Promise<Category> {
  const cacheKey = `category_${id}`;
  const cachedCategory = getCachedData<Category>(cacheKey);

  if (cachedCategory) {
    return cachedCategory;
  }

  const category = await fetchWithAuth(
    `${API_URL}${apiUrls.categories.getById(id)}`
  );
  setCachedData(cacheKey, category);
  return category;
}

export async function createCategory(
  category: Omit<Category, "id">
): Promise<Category> {
  const newCategory = await fetchWithAuth(
    `${API_URL}${apiUrls.categories.create}`,
    {
      method: "POST",
      body: JSON.stringify(category),
    }
  );
  invalidateCategoryCache();
  return newCategory;
}

export async function updateCategory(
  id: string,
  category: Partial<Category>
): Promise<Category> {
  const updatedCategory = await fetchWithAuth(
    `${API_URL}${apiUrls.categories.putById(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(category),
    }
  );
  setCachedData(`category_${id}`, updatedCategory);
  return updatedCategory;
}

export async function deleteCategory(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}${apiUrls.categories.deleteById(id)}`, {
    method: "DELETE",
  });
  cache.delete(`category_${id}`);
  invalidateCategoryCache();
}

function invalidateCategoryCache() {
  cache.delete("allCategories");
}
