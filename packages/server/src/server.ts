import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import user from "./routes/user";

const app = new Hono();

app.route("/user", user);

export default app;
