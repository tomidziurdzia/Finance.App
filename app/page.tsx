import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Bienvenido a tu Administrador de Gastos
        </h1>
        <p className="mt-3 text-2xl">
          Gestiona tus finanzas de manera eficiente
        </p>
        <div className="flex mt-6">
          <Link href="/auth/login" passHref>
            <Button>Iniciar Sesión</Button>
          </Link>
          <Link href="/auth/register" passHref>
            <Button variant="outline" className="ml-4">
              Registrarse
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
