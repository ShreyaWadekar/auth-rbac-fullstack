    import api from "./axios";
import { LoginForm, RegisterForm, AuthResponse } from "../types";

export const registerUser = async (data: RegisterForm): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginForm): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const getUserContent = async () => {
  const res = await api.get("/api/user");
  return res.data;
};

export const getAdminContent = async () => {
  const res = await api.get("/api/admin");
  return res.data;
};