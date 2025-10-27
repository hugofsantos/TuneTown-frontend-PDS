import TuneetGatewayHttp from "@/infra/gateway/TuneetGatewayHttp";
import { toast } from "sonner";

export async function makeATuneet(comment: string, trackId: string | undefined, itemType: "music" | "album" | "podcast") {
    const tuneetGatewayHttp = new TuneetGatewayHttp();

    try {
        const response = await tuneetGatewayHttp.makeATuneet(comment, trackId, itemType);
    
        return response;
    } catch (error: any) {
        console.error("Erro ao fazer requisição:", error);
        toast.error("Ocorreu um erro, por favor tente novamente.");
    }
}
