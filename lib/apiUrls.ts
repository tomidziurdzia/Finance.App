export const apiUrls = {
  user: {
    getUserById: (id: string) => `/user/${id}`,
    getUserByToken: "/user",
    updatePassowrd: "/user/update-password",
    resetPassowrd: "/user/reset-password",
    forgetPassowrd: "/user/forget-password",
  },
  auth: {
    signup: "/user/register",
    signin: "/user/login",
  },
  incomes: {
    create: "/incomes",
    getIncomes: ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => `/incomes?startDate=${startDate}&endDate=${endDate}`,
    getById: (id: string) => `/incomes/${id}`,
    putById: (id: string) => `/incomes/${id}`,
    deleteById: (id: string) => `/incomes/${id}`,
  },
  expenses: {
    create: "/expenses",
    getExpenses: ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => `/expenses?from=${startDate}&to=${endDate}`,
    getById: (id: string) => `/expenses/${id}`,
    putById: (id: string) => `/expenses/${id}`,
    deleteById: (id: string) => `/expenses/${id}`,
  },
  investments: {
    create: "/investments",
    getInvestments: ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => `/investments?from=${startDate}&to=${endDate}`,
    getById: (id: string) => `/investments/${id}`,
    putById: (id: string) => `/investments/${id}`,
    deleteById: (id: string) => `/investments/${id}`,
  },
  wallets: {
    getAll: "/wallets",
    create: "/wallets",
    getById: (id: string) => `/wallets/${id}`,
    putById: (id: string) => `/wallets/${id}`,
    deleteById: (id: string) => `/wallets/${id}`,
  },
  categories: {
    getAll: "/categories",
    create: "/categories",
    getById: (id: string) => `/categories/${id}`,
    putById: (id: string) => `/categories/${id}`,
    deleteById: (id: string) => `/categories/${id}`,
  },
};
