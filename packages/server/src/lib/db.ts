import { getDBfromContext } from "@/db";
import { getPrivyUserFromContext } from "./privy";
import { pointsTransactions, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { Context } from "hono";

export async function getUserFromContext(ctx: Context) {
    const db = getDBfromContext(ctx);
    const privyUser = await getPrivyUserFromContext(ctx);

    if (!privyUser) return null;

    const { 0: user } = await db.select().from(users).where(
        eq(users.privyId, privyUser.id),
    ).limit(1);

    return user || null;
}

export async function registerPointsTransaction(
    ctx: Context,
    uid: number,
    reason: string,
    points: number,
) {
    const db = getDBfromContext(ctx);

    await db.insert(pointsTransactions).values({
        user: uid,
        reason: reason,
        points: points,
    });

    await db.update(users).set({ points: sql`${users.points} + ${points}` })
        .where(
            eq(users.id, uid),
        );
}
