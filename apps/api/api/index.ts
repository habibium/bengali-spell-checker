import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");
app.use(
  cors({
    origin: ["https://hoppscotch.io"],
  })
);

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/:message", (c) => {
  return c.json({ message: `Hello ${c.req.param("message")}` });
});

export default handle(app);
