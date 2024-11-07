"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiUrls } from "lib/apiUrls";
import {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "interfaces/userInterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetch(`${API_URL}${apiUrls.auth.signin}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  if (data.token) {
    const user: User = {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      currency: data.currency,
      locale: data.locale,
    };

    cookies().set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    cookies().set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  return data.user;
}

export async function logout() {
  cookies().delete("auth_token");
  cookies().delete("user");
  redirect("/signin");
}

export async function register(
  credentials: RegisterCredentials
): Promise<User> {
  const response = await fetch(`${API_URL}/${apiUrls.auth.signup}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();

  if (data.token) {
    const user: User = {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      currency: data.currency,
      locale: data.locale,
    };

    cookies().set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    cookies().set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  return data.user;
}

export async function getCurrentUser(): Promise<User | null> {
  const userCookie = cookies().get("user");
  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  const tokenCookie = cookies().get("auth_token");
  return tokenCookie ? tokenCookie.value : null;
}
