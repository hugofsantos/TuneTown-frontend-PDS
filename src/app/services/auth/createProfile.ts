import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";
import { Profile } from "@/domain/types/Profile";

export async function createProfile(
  userId: string,
): Promise<Profile | undefined> {
  const userGatewayHttp = new UserGatewayHttp();

  try {
    const response = await userGatewayHttp.createProfile(userId);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
