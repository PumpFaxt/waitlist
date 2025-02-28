import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { generateRandomString } from "@/lib/utils";

export const users = table("users_table", {
    id: t.int().primaryKey({ autoIncrement: true }),
    privyId: t.text().notNull(),
    twitter: t.text().notNull(),
    name: t.text().notNull(),
    avatarImageUrl: t.text(),
    telegram: t.text(),
    referralCode: t.text().notNull().unique().$default(() =>
        generateRandomString(6, "alphabetic.lowercase")
    ),
    points: t.int().default(0),
    referredBy: t.int().references((): t.AnySQLiteColumn => users.id),
    ...timestamps,
}, (table) => [
    t.uniqueIndex("privy_id_idx").on(table.privyId),
]);

export const referrals = table("referrals_table", {
    id: t.int().primaryKey({ autoIncrement: true }),
    referrer: t.int().notNull().references(() => users.id),
    referredUser: t.int().notNull().references(() => users.id),
    ...timestamps,
}, (table) => [t.index("referrer_idx").on(table.referrer)]);

export const pointsTransactions = table("points_transactions_table", {
    id: t.int().primaryKey({ autoIncrement: true }),
    user: t.int().notNull().references(() => users.id),
    points: t.int().notNull(),
    reason: t.text().notNull(),
    ...timestamps,
});
