import { privyAppId } from "@/config";
import { PrivyClient } from "@privy-io/server-auth";
import { Context } from "hono";

export function getPrivyClientFromContext(ctx: Context) {
    const privyClient = new PrivyClient(privyAppId, ctx.env.PRIVY_APP_SECRET);
    return privyClient;
}

export async function getPrivyUserFromContext(ctx: Context) {
    const privyClient = getPrivyClientFromContext(ctx);
    const accessToken = ctx.req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) return null;
    try {
        const { userId } = await privyClient.verifyAuthToken(accessToken);
        return await privyClient.getUserById(userId);
    } catch (_) {
        return null;
    }
}
