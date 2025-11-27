import HttpClient from "./IHttpClient";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// Função utilitária para deslogar usuário
function forceLogout() {
  localStorage.removeItem("tunetown@token");
  localStorage.removeItem("tunetown@user");
  localStorage.removeItem("tunetown@profile");
  window.location.reload();
}
export default class AxiosAdapter implements HttpClient {
  constructor() {
    const savedToken = localStorage.getItem("tunetown@token");
    if (savedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
    }
  }

  private handleAuthError(error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 403) {
      toast.error(
        "Sessão expirada ou acesso não autorizado. Faça login novamente.",
      );
      forceLogout();
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const res = await axios.delete<T>(url);
      return res.data;
    } catch (error: unknown) {
      this.handleAuthError(error);
      console.error(`Error in delete: ${error}`);
      throw error;
    }
  }

  async get<T>(url: string): Promise<T> {
    try {
      const res = await axios.get<T>(url);
      return res.data;
    } catch (error: unknown) {
      this.handleAuthError(error);
      console.error(`Error in get: ${error}`);
      throw error;
    }
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    try {
      // Detect FormData and set headers for file upload
      let config = {};
      if (typeof FormData !== "undefined" && data instanceof FormData) {
        config = { headers: { "Content-Type": "multipart/form-data" } };
      }
      const res = await axios.post<T>(url, data, config);
      return res.data;
    } catch (error: unknown) {
      console.error(`Error in post: ${error}`);
      throw error;
    }
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const res = await axios.put<T>(url, data);
    return res.data;
  }

  setHeaders(headers: Record<string, string> | null) {
    if (!headers || Object.keys(headers).length === 0) {
      // Limpa apenas o Authorization se existir
      if (
        axios.defaults.headers.common &&
        axios.defaults.headers.common["Authorization"]
      ) {
        delete axios.defaults.headers.common["Authorization"];
      }
      return;
    }
    Object.entries(headers).forEach(([key, value]) => {
      if (key && value) {
        axios.defaults.headers.common[key] = value;
      }
    });
  }
}
