import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";

export async function deleteFollowUser(followerId: string, followedId: string) {
  const userGateway = new UserGatewayHttp();

  try {
    const response = await userGateway.deleteFollowUser(followerId, followedId);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
