export interface AuthResponse {
  token: string;
  role: string;
  name: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

export interface LoginForm {
  email: string;
  password: string;
}