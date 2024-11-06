"use server";

import { cookies } from "next/headers";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    console.error("Error: Unauthorized access - No token found");
    throw new Error("Unauthorized access");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...(options.headers as Record<string, string>),
  };

  if (options.method && options.method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      throw new Error("Unauthorized access - Invalid token");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export default fetchWithAuth;
