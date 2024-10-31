import { redirect } from "next/navigation";

export async function loginAction(credentials: {
  email: string;
  password: string;
}) {
  try {
    await login(credentials);
    redirect("/home");
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
}

export async function registerAction(credentials: {
  name: string;
  lastname: string;
  email: string;
  password: string;
}) {
  try {
    await register(credentials);
    redirect("/home");
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed");
  }
}

export async function logoutAction() {
  await logout();
  redirect("/auth/login");
}
