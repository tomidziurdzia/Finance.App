import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface AuthUser {
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  username?: string;
  token?: string;
  currency?: string;
  locale?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const checkAuth = async (callback: Function) => {
  const sessionToken = cookies().get("auth_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/check-session`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { user }: { user: AuthUser } = await response.json();

    return callback(user);
  } catch (error) {
    console.error("Error checking authentication:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
