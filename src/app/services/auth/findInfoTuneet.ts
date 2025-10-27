import LikeGatewayHttp from "@/infra/gateway/LikeGatewayHttp";

export async function findTunetsInfos(tuneetId: string) {
    const likeGatewayHttp = new LikeGatewayHttp();

    try {
        return await likeGatewayHttp.findTunetsInfos(tuneetId);
    } catch (error: any) {
        console.error("Erro ao fazer requisição:", error);
    }
}
