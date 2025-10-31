import { toast } from "sonner";
import AuthGatewayHttp from "../../../infra/gateway/AuthGatewayHttp";
import { userSpotifyToken } from "../../../domain/types/Auth";

export async function storeTokenSpotifyService({
  accessToken,
  refreshToken,
  userId,
}: userSpotifyToken) {
  const authGatewayHttp = new AuthGatewayHttp();

  try {
    console.log("storeTokenSpotifyService", accessToken, refreshToken, userId);
    const response = await authGatewayHttp.storeTokenSpotify({
      accessToken,
      refreshToken,
      userId,
    });
    return response;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
