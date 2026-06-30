import { createApp } from "./app";

const port = Number(process.env.PORT ?? 8787);

createApp(process.env.API_PROVIDER).listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});
