import { getDBfromContext } from "@/db";
import { getUserFromContext } from "@/lib/privy";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

const app = new Hono();

app.post("/", async (ctx) => {
    const db = getDBfromContext(ctx);

    const privyUser = await getUserFromContext(ctx);
    const twitterUsername = privyUser?.twitter?.username;
    const twitterName = privyUser?.twitter?.name;

    if (!(privyUser && twitterUsername && twitterName)) {
        return ctx.text("Unauthorized", 401);
    }

    const { 0: user } = await db.select().from(users).where(
        eq(users.privyId, privyUser.id),
    );

    if (user) {
        return ctx.json(user, 200);
    }

    const newUser = await db.insert(users).values({
        privyId: privyUser.id,
        twitter: twitterUsername,
        avatarImageUrl: privyUser.twitter?.profilePictureUrl,
        name: twitterName,
    });

    return ctx.json(newUser, 201);
});

export default app;
