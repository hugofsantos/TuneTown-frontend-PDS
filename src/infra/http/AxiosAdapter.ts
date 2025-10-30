import HttpClient from "./IHttpClient";
import axios from "axios";
import { toast } from "sonner";

// Função utilitária para deslogar usuário
function forceLogout() {
  localStorage.removeItem("tunetown@token");
  localStorage.removeItem("tunetown@user");
  localStorage.removeItem("tunetown@profile");
  window.location.reload();
}
export default class AxiosAdapter implements HttpClient {
  async delete(url: string): Promise<any> {
    try {
      const res = await axios.delete(url);
      return res.data;
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error("Sessão expirada ou acesso não autorizado. Faça login novamente.");
        forceLogout();
      }
      console.error(`Error in delete: ${error}`);
      throw error;
    }
  }
  
  async get(url: string): Promise<any> {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error("Sessão expirada ou acesso não autorizado. Faça login novamente.");
        forceLogout();
      }
      console.error(`Error in get: ${error}`);
      throw error;
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      // Detect FormData and set headers for file upload
      let config = {};
      if (typeof FormData !== "undefined" && data instanceof FormData) {
        config = { headers: { 'Content-Type': 'multipart/form-data' } };
      }
      const res = await axios.post(url, data, config);
      return res.data;
    } catch (error) {
      console.error(`Error in post: ${error}`);
      throw error;
    }
  }

  async put(url: string, data: any): Promise<any> {
    const res = await axios.put(url, data);
    return res.data;
  }

  setHeaders(headers: Record<string, string> | null) {
    if (!headers || Object.keys(headers).length === 0) {
      // Limpa apenas o Authorization se existir
      if (axios.defaults.headers.common && axios.defaults.headers.common["Authorization"]) {
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