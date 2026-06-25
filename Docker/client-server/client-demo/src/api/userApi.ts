import axios from "axios";
import type { User, UserInput } from "../types/user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

export const createUser = async (payload: UserInput): Promise<User> => {
  const { data } = await api.post<User>("/users", payload);
  return data;
};

export const updateUser = async (id: string, payload: UserInput): Promise<User> => {
  const { data } = await api.put<User>(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
