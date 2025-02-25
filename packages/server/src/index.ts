import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";

const app = new Hono();

const frontendUrl = Bun.env.FRONTEND_URL || "localhost:5173";

app.use(logger());
app.use(csrf({ origin: frontendUrl }));
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});


export default app;
