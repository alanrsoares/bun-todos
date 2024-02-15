import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import router from "./routers";

function main() {
  const { server } = new Elysia()
    // use html middleware
    .use(html())
    // use router middleware
    .use(router)
    // start server
    .listen(3000);

  console.log(
    `🦊 Elysia is running at http://${server?.hostname}:${server?.port}`
  );
}

main();
