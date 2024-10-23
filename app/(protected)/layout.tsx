"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
}
