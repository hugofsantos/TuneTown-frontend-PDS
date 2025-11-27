import TuneetGatewayHttp from "@/infra/gateway/TuneetGatewayHttp";
import { TunableItem } from "@/domain/types/Post";
import { toast } from "sonner";

export async function findSongByTitle(
  title: string,
  itemType: string,
): Promise<TunableItem[] | undefined> {
  const tuneetGatewayHttp = new TuneetGatewayHttp();

  try {
    const response = await tuneetGatewayHttp.findByTitle(title, itemType);
    console.log(response);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
