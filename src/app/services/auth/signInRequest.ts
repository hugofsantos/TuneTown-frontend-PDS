import { SignInResponse, UserLogin } from "@/domain/types/Auth";
import AuthGatewayHttp from "@/infra/gateway/AuthGatewayHttp";
import { toast } from "sonner";

export async function signInRequest(
  userData: UserLogin,
): Promise<SignInResponse | undefined> {
  const authGatewayHttp = new AuthGatewayHttp();

  try {
    const response = await authGatewayHttp.signIn(userData);
    return response;
  } catch (error: unknown) {
    console.error("Erro ao fazer requisição:", error);
    toast.error("Ocorreu um erro, por favor tente novamente.");
  }
}
