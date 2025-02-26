import { PrivyClient } from "@privy-io/server-auth";
import { Context } from "hono";

const privyClient = new PrivyClient(process.env.PRIVY_APP_ID, process.env.PRIVY_APP_SECRET);

export function getUserFromContext(ctx: Context) {
    const accessToken = ctx.req.header("Authorization")?.replace('Bearer ', ''); 
    if (!accessToken) return null;
    return privyClient.getUser({idToken : accessToken});
}

export default privyClient;