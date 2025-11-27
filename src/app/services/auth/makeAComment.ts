import CommentGatewayHttp from "@/infra/gateway/CommentGatewayHttp";
import { toast } from "sonner";

export async function makeAComment(
  tuneetId: string,
  profileId: string,
  contentText: string,
) {
  const commentGatewayHttp = new CommentGatewayHttp();

  try {
    const response = await commentGatewayHttp.makeAComment(
      tuneetId,
      profileId,
      contentText,
    );
    return response?.data ?? response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
