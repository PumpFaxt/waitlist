import { getDBfromContext } from "@/db";
import privyClient, { getUserFromContext } from "@/lib/privy";
import { Hono } from "hono";

const app = new Hono();

app.post("/", async (ctx) => {
    const db = getDBfromContext(ctx);

    const privyId = await getUserFromContext(ctx);

    console.log(privyId)

    const users = await db.query.users.findFirst({})

    return ctx.text("ok lol")
});

export default app;
