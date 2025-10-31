import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";

export async function findUserProfile(profileId: string) {
  const userGatewayHttp = new UserGatewayHttp();

  try {
    const response = await userGatewayHttp.findUserProfile(profileId);
    return response;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
