import axios from "axios";
let api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const register = async ({
  fullname,
  email,
  password,
  contact,
  isSeller = false,
}) => {
  const response = await api.post("/api/auth/register", {
    fullname,
    email,
    password,
    contact,
    isSeller,
  });
  return response.data;
};

export const login = async ({ identifier, password }) => {
  const response = await api.post("/api/auth/login", {
    identifier,
    password,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/");

  return response.data;
};

export const inquiry = async ({ fullname, email, orderNumber, message }) => {
  const response = await api.post("/api/sendMessage", {
    fullname,
    email,
    orderNumber,
    message,
  });
  return response.data;
};

export const subscribe = async ({ email }) => {
  const response = await api.post("/api/subscribe", { email });
  return response.data;
};
