import { cookies } from "next/headers";

export const getServerToken = () => {
  return cookies().get("auth_token")?.value || null;
};

export const getServerUser = () => {
  const userStr = cookies().get("user")?.value;
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};
