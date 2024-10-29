import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token) {
    redirect("/home");
  } else {
    redirect("/auth/login");
  }
}
