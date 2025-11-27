import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";
import { UserWithProfile } from "@/domain/types/User";

export async function searchProfileByUsername(
  username: string,
): Promise<UserWithProfile | undefined> {
  const userGateway = new UserGatewayHttp();

  try {
    const response = await userGateway.searchProfileByUsername(username);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
