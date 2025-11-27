import { PageMetadados, TuneetResponse } from "@/domain/types/Post";
import TuneetGatewayHttp from "@/infra/gateway/TuneetGatewayHttp";
import { toast } from "sonner";

export async function findTuneetsByUserId(
  userId: string,
  metadados: PageMetadados,
): Promise<TuneetResponse | undefined> {
  const tuneetGatewayHttp = new TuneetGatewayHttp();

  try {
    const response = await tuneetGatewayHttp.findTuneetsByUserId(
      userId,
      metadados,
    );
    console.log(response);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
