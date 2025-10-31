import TuneetGatewayHttp from "@/infra/gateway/TuneetGatewayHttp";
import { toast } from "sonner";

export async function findSongByTitle(title: string, itemType: string) {
  const tuneetGatewayHttp = new TuneetGatewayHttp();

  try {
    const response = await tuneetGatewayHttp.findByTitle(title, itemType);
    console.log(response);
    return response;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
