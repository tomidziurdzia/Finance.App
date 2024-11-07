import type { Metadata } from "next";
import "./globals.css";
import { cn } from "lib/utils";

export const metadata: Metadata = {
  title: "Finance App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased font-primary"
        )}
      >
        {children}
      </body>
    </html>
  );
}
