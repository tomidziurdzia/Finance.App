import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarContextProvider } from "@/components/context/sidebar-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    redirect("/auth/sigin");
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarContextProvider>
          <SidebarProvider>
            <Sidebar />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </SidebarContextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
