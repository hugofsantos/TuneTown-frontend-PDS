import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { toast } from "sonner";

type TuneScoreResponse = {
  score: number;
  message: string;
};

export async function getTuneScore(
  userId1: string,
  userId2: string,
): Promise<TuneScoreResponse | null> {
  const userGatewayHttp = new UserGatewayHttp();

  try {
    const response = await userGatewayHttp.getTuneScore(userId1, userId2);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao buscar TuneScore:", error);
    toast.error("Não foi possível calcular o TuneScore.");
    return null;
  }
}
