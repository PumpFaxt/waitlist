import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "./routes/user";
import referral from "./routes/referral";
import "dotenv/config";

const app = new Hono();

app.use(
    "*",
    cors({
        origin: "*",
        allowMethods: ["POST", "GET", "PATCH", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    }),
);

// app.use("*", async (ctx, next) => {
//     console.log(ctx.req.query);
//     await next();
// });

app.route("/user", user);
app.route("/referral", referral);

export default app;
