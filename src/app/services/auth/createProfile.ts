import { UserLogin } from "@/domain/types/Auth";
import AuthGatewayHttp from "@/infra/gateway/AuthGatewayHttp";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";

export async function createProfile(userId: string) {
  const userGatewayHttp = new UserGatewayHttp();

  try {
    const response = await userGatewayHttp.createProfile(userId);
    return response;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
