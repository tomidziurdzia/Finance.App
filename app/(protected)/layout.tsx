"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Aquí verificarías si el usuario está autenticado
    // Por ejemplo, comprobando si existe un token en localStorage
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
