import LikeGatewayHttp from "@/infra/gateway/LikeGatewayHttp";
import { toast } from "sonner";

export async function likeATuneet(tuneetId: string, profileId: string) {
  const likeGatewayHttp = new LikeGatewayHttp();

  try {
    const response = await likeGatewayHttp.likeATuneet(tuneetId, profileId);
    const data = response as { data?: unknown };
    return data?.data ?? response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
