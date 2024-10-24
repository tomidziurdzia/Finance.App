"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from "lucide-react";

// Datos de ejemplo
const wallets = [
  { id: 1, name: "Efectivo", balance: 500, currency: "USD" },
  { id: 2, name: "Cuenta Bancaria", balance: 2500, currency: "USD" },
  { id: 3, name: "Ahorros", balance: 10000, currency: "USD" },
];

const expenses = [
  { category: "Alimentación", amount: 300 },
  { category: "Transporte", amount: 150 },
  { category: "Entretenimiento", amount: 200 },
  { category: "Servicios", amount: 250 },
];

const incomeVsExpenses = [
  { name: "Ingresos", value: 4000, color: "#10B981" },
  { name: "Gastos", value: 2500, color: "#EF4444" },
];

export default function Home() {
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const totalIncome =
    incomeVsExpenses.find((item) => item.name === "Ingresos")?.value || 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#1B212D]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="bg-[#363A3F] flex p-4 items-center justify-center">
          <div className="bg-[#4E5257] border-[#4E5257] w-14 h-14 flex justify-center items-center rounded-full border-[14px]">
            <WalletIcon className="h-5 w-5 text-primary" strokeWidth={2} />
          </div>
          <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#929EAE]">
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${totalBalance.toFixed(2)}
              </div>
            </CardContent>
          </div>
        </Card>
        <Card className="flex p-4 items-center justify-center">
          <div className="bg-[#4E5257] border-[#4E5257] w-14 h-14 flex justify-center items-center rounded-full border-[14px]">
            <ArrowUpIcon className="h-5 w-5 text-primary" strokeWidth={4} />
          </div>
          <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#929EAE]">
                Ingresos del Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalIncome.toFixed(2)}
              </div>
            </CardContent>
          </div>
        </Card>
        <Card className="flex p-4 items-center justify-center">
          <div className="bg-[#4E5257] border-[#4E5257] w-14 h-14 flex justify-center items-center rounded-full border-[14px]">
            <ArrowDownIcon className="h-5 w-5 text-red-400" strokeWidth={4} />
          </div>
          <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#929EAE]">
                Ingresos del Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalIncome.toFixed(2)}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mis Billeteras</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {wallets.map((wallet) => (
                <li
                  key={wallet.id}
                  className="flex justify-between items-center"
                >
                  <span>{wallet.name}</span>
                  <span className="font-semibold">
                    {wallet.currency} {wallet.balance.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenses}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expenses.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${index * 45}, 70%, 60%)`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ingresos vs Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeVsExpenses}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {incomeVsExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
