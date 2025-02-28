import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "./routes/user";
import "dotenv/config";

const app = new Hono();

app.use(
    "*",
    cors({
        origin: "*",
        allowMethods: ["POST", "GET", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    }),
);

app.route("/user", user);

export default app;
