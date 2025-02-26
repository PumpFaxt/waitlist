import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import * as schema from "./schema"

export function getDBfromContext(ctx: Context) {
    return drizzle(ctx.env.DB, { casing: "snake_case", logger: true, schema });
}
