import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import router from "./routers";

function main() {
  const app = new Elysia().use(html()).use(router).listen(3000);

  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
}

main();
