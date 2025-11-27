import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { UserWithProfile } from "@/domain/types/User";
import { toast } from "sonner";

export async function searchProfiles(
  query: string,
): Promise<UserWithProfile[] | undefined> {
  const userGateway = new UserGatewayHttp();

  try {
    const response = await userGateway.searchProfiles(query);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
    return [];
  }
}
