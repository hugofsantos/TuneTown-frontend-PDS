import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";
import { Profile } from "@/domain/types/Profile";

export async function findUserProfile(
  profileId: string,
): Promise<Profile | undefined> {
  const userGatewayHttp = new UserGatewayHttp();

  try {
    const response = await userGatewayHttp.findUserProfile(profileId);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
