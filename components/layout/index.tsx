"use client";

import { TooltipProvider } from "../ui/tooltip";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout({ children }: { children: any }) {
  return <TooltipProvider delayDuration={500}>{children}</TooltipProvider>;
}
