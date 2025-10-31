import { UserLogin } from "@/domain/types/Auth";
import AuthGatewayHttp from "@/infra/gateway/AuthGatewayHttp";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";

export async function searchProfileByUsername(username: string) {
  const userGateway = new UserGatewayHttp();

  try {
    const response = await userGateway.searchProfileByUsername(username);
    return response;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
