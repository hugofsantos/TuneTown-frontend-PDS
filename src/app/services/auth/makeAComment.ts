import CommentGatewayHttp from "@/infra/gateway/CommentGatewayHttp";
import LikeGatewayHttp from "@/infra/gateway/LikeGatewayHttp";
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
    // toast.success(response.message)
    return response.data;
  } catch (error: any) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
