import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
