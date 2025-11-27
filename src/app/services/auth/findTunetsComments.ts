import CommentGatewayHttp from "@/infra/gateway/CommentGatewayHttp";
import { toast } from "sonner";

export async function findTunetsComments(tuneetId: string) {
  const commentGatewayHttp = new CommentGatewayHttp();

  try {
    return await commentGatewayHttp.findTunetsComments(tuneetId);
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
