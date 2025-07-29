import { Application } from "@oak/oak/application";
import { apiRouter } from "./routes/api.routes.ts";

const PORT = parseInt(Deno.env.get("PORT") || "8003");
const HOST = Deno.env.get("HOST") || "localhost";

const app = new Application();

// Serve static files from public directory
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// API routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen({
  port: PORT,
});

const cachebust = `time=${new Date().toISOString()}`;

console.log(`🦕 Server is running on http://${HOST}:${PORT}?${cachebust}`);
console.log(`🎯 Visit http://${HOST}:${PORT}?${cachebust} to see the game`);
console.log(`🔧 API health check at http://${HOST}:${PORT}/api/health?${cachebust}`);
