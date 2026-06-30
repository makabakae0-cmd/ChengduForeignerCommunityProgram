import { createApp } from "./app";

const app = createApp(process.env.API_PROVIDER);

export default app.callback();
