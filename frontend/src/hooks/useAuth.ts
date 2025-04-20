"use client";

import { loginData, RegisterData, User } from "@/types/IUser";
import api from "@/utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

    api
      .get<User>("/api/users/profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter o perfil do usuário:", error);
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.Authorization;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const authUser = (data: { token: string; user: User }) => {
    localStorage.setItem("token", JSON.stringify(data.token));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setUser(data.user);
    setMessage({ text: "Login realizado com sucesso!", type: "success" });
    router.push("/");
  };

  const register = async (userData: RegisterData) => {
    setMessage(null);

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      return setMessage({
        text: "Todos os campos são obrigatórios!",
        type: "error",
      });
    }

    if (userData.password.length < 6) {
      return setMessage({
        text: "A senha deve ter no mínimo 6 caracteres!",
        type: "error",
      });
    }

    if (userData.password !== userData.confirmPassword) {
      return setMessage({ text: "As senhas não coincidem!", type: "error" });
    }

    try {
      const response = await api.post<{ token: string; user: User }>(
        "/api/users/register/user",
        userData
      );

      authUser(response.data);

      setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.errors || "Erro desconhecido no registro";
        setMessage({ text: errorMessage, type: "error" });
      } else {
        setMessage({ text: "Erro desconhecido no registro", type: "error" });
      }
    }
  };

  const registerAdmin = async (adminData: RegisterData) => {
    setMessage(null);
  
    if (!user || user.role !== "admin") {
      return setMessage({
        text: "Você não tem permissão para cadastrar um administrador.",
        type: "error",
      });
    }
  
    if (
      !adminData.name ||
      !adminData.email ||
      !adminData.password ||
      !adminData.confirmPassword
    ) {
      return setMessage({
        text: "Todos os campos são obrigatórios!",
        type: "error",
      });
    }
  
    if (adminData.password.length < 6) {
      return setMessage({
        text: "A senha deve ter no mínimo 6 caracteres!",
        type: "error",
      });
    }
  
    if (adminData.password !== adminData.confirmPassword) {
      return setMessage({ text: "As senhas não coincidem!", type: "error" });
    }
  
    try {
      const response = await api.post<{ token: string; user: User }>(
        "/api/users/register/admin",
        adminData
      );
  
      authUser(response.data);
  
      setMessage({ text: "Admin cadastrado com sucesso!", type: "success" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.errors || "Erro desconhecido no registro do admin";
        setMessage({ text: errorMessage, type: "error" });
      } else {
        setMessage({ text: "Erro desconhecido no registro do admin", type: "error" });
      }
    }
  };

  const login = async (userData: loginData) => {
    setMessage(null);

    if (!userData.email || !userData.password) {
      return setMessage({
        text: "E-mail e senha são obrigatórios!",
        type: "error",
      });
    }

    try {
      const response = await api.post("/api/users/login", userData);
      authUser(response.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage({ text: "E-mail ou senha inválidos!", type: "error" });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;

    setUser(null);
    setMessage({ text: "Logout realizado com sucesso!", type: "success" });
    router.push("/login");
  };

  return { register, registerAdmin, login, user, logout, isLoading, message };
};
