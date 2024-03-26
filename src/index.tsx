import { Elysia } from "elysia";

import router from "./routers";

function main() {
  const { server } = new Elysia()
    // use router middleware
    .use(router)
    // serve static files
    .get("/styles.css", () => Bun.file("./public/styles.css"))
    .get("/icon.svg", () => Bun.file("./public/icon.svg"))
    .get("/bg.webp", () => Bun.file("./public/bg.webp"))
    // start server
    .listen(3000);

  console.log(
    `🦊 Elysia is running at http://${server?.hostname}:${server?.port}`,
  );
}

main();
