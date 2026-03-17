export const saveAuth = (token: string, role: string, name: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("name", name);
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
};

export const getToken   = () => localStorage.getItem("token");
export const getRole    = () => localStorage.getItem("role");
export const getName    = () => localStorage.getItem("name");
export const isLoggedIn = () => !!getToken();