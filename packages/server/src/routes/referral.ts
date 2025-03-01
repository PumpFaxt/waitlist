import { getDBfromContext } from "@/db";
import { getPrivyUserFromContext } from "@/lib/privy";
import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import { referrals, users } from "@/db/schema";
import { getUserFromContext, registerPointsTransaction } from "@/lib/db";

const app = new Hono();

app.get("/referrer/:referralCode", async (ctx) => {
    const db = getDBfromContext(ctx);
    const referralCode = ctx.req.param("referralCode");

    const { 0: user } = await db.select({ name: users.twitter }).from(users)
        .where(
            eq(users.referralCode, referralCode),
        );

    if (!user) {
        return ctx.json(null, 404);
    }

    return ctx.json(user, 200);
});

app.get("/my-count", async (ctx) => {
    const user = await getUserFromContext(ctx);

    if (!user) {
        return ctx.json(null, 401);
    }

    const db = getDBfromContext(ctx);
    const count = await db.$count(referrals, eq(referrals.referrer, user.id));

    return ctx.json({ count }, 200);
});

app.get("/leaderboard", async (ctx) => {
    const db = getDBfromContext(ctx);

    const leaderboard = await db.select({
        twitter: users.twitter,
        avatarImageUrl: users.avatarImageUrl,
        points: users.points,
    }).from(users).orderBy(desc(users.points)).limit(10);

    return ctx.json(leaderboard, 200);
});

export default app;
