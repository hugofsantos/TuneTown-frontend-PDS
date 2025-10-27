import { UserRegister } from "@/domain/types/Auth";
import AuthGatewayHttp from "@/infra/gateway/AuthGatewayHttp";
import { toast } from 'sonner'

export async function signUpRequest(userData: UserRegister) {
  const authGatewayHttp = new AuthGatewayHttp();
  try {
    const response = await authGatewayHttp.signUp(userData);
    toast.success('Usuário criado com sucesso!');
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}
