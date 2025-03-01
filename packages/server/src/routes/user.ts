import { getDBfromContext } from "@/db";
import { getPrivyUserFromContext } from "@/lib/privy";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { referrals, users } from "@/db/schema";
import { getUserFromContext, registerPointsTransaction } from "@/lib/db";

const app = new Hono();

app.post("/", async (ctx) => {
    const db = getDBfromContext(ctx);

    const privyUser = await getPrivyUserFromContext(ctx);
    const twitterUsername = privyUser?.twitter?.username;
    const twitterName = privyUser?.twitter?.name;

    if (!(privyUser && twitterUsername && twitterName)) {
        return ctx.text("Unauthorized", 401);
    }

    const { 0: user } = await db.select().from(users).where(
        eq(users.privyId, privyUser.id),
    ).limit(1);

    if (user) {
        return ctx.json(user, 200);
    }

    const referralCodeUsed = ctx.req.query("ref");
    let validReferrer: number = -1;

    if (referralCodeUsed) {
        const { 0: referrer } = await db.select().from(users).where(
            eq(users.referralCode, referralCodeUsed),
        ).limit(1);
        if (referrer) {
            validReferrer = referrer.id;
        }
    }

    const { 0: newUser } = await db.insert(users).values({
        privyId: privyUser.id,
        twitter: twitterUsername,
        avatarImageUrl: privyUser.twitter?.profilePictureUrl,
        name: twitterName,
        referredBy: validReferrer != -1 ? validReferrer : undefined,
    }).returning();
    if (validReferrer != -1) {
        await db.insert(referrals).values({
            referrer: validReferrer,
            referredUser: newUser.id,
        });
        await registerPointsTransaction(
            ctx,
            validReferrer,
            `Referred user @${newUser.twitter}`,
            100,
        );
    }
    await registerPointsTransaction(
        ctx,
        newUser.id,
        "Joined the waitlist",
        120,
    );
    return ctx.json(newUser, 201);
});

app.get("/referrer", async (ctx) => {
    const db = getDBfromContext(ctx);

    const user = await getUserFromContext(ctx);

    if (!user) {
        return ctx.json(null, 401);
    }

    if (!user.referredBy) {
        return ctx.json(null, 404);
    }

    const { 0: referrer } = await db.select({ name: users.twitter }).from(users)
        .where(
            eq(users.id, user.referredBy),
        ).limit(1);

    if (!referrer) {
        return ctx.json(null, 404);
    }

    return ctx.json(referrer, 200);
});

app.get("/points", async (ctx) => {
    const user = await getUserFromContext(ctx);

    if (!user) {
        return ctx.json(null, 401);
    }

    return ctx.json({ id: user.id, points: user.points }, 200);
});

app.patch("/update-telegram", async (ctx) => {
    const db = getDBfromContext(ctx);
    const privyUser = await getPrivyUserFromContext(ctx);
    const user = await getUserFromContext(ctx);
    if (!user || !privyUser) {
        return ctx.text("Unauthorized", 401);
    }
    const currentTelegram = privyUser.telegram;

    if (!currentTelegram) {
        return ctx.text("Telegram not linked", 400);
    }

    if (user.telegram) {
        return ctx.text("Telegram already linked", 400);
    }

    await db.update(users).set({ telegram: currentTelegram.username }).where(
        eq(users.id, user.id),
    );

    await registerPointsTransaction(ctx, user.id, "Linked Telegram", 25);

    if (!user.avatarImageUrl && currentTelegram.photoUrl) {
        await db.update(users).set({ avatarImageUrl: currentTelegram.photoUrl })
            .where(
                eq(users.id, user.id),
            );
    }

    return ctx.text("Success", 200);
});

export default app;
