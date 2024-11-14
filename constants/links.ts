import { Banknote, Briefcase, CandlestickChart, HandCoins } from "lucide-react";

export const dashboardLinks = [
  {
    name: "Overview",
    href: "/",
    Icon: HandCoins,
  },
  {
    name: "Income",
    href: "/incomes",
    Icon: Briefcase,
  },
  {
    name: "Expenses",
    href: "/expenses",
    Icon: Banknote,
  },
  {
    name: "Investments",
    href: "/investments",
    Icon: CandlestickChart,
  },
];
