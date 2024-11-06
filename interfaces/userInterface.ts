export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  lastname: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  currency: string;
  locale: string;
}
