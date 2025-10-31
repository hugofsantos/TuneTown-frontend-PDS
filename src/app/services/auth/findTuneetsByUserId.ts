import { PageMetadados } from "@/domain/types/Post";
import TuneetGatewayHttp from "@/infra/gateway/TuneetGatewayHttp";
import { toast } from "sonner";

export async function findTuneetsByUserId(
  userId: string,
  metadados: PageMetadados,
) {
  const tuneetGatewayHttp = new TuneetGatewayHttp();

  try {
    const response = await tuneetGatewayHttp.findTuneetsByUserId(
      userId,
      metadados,
    );
    console.log(response);
    return response;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
