import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import { APP_TITLE } from "./config";
import Layout from "./ui/Layout";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <Document>
        <Layout>
          <section>
            <h1 class="text-accent">Hello, Bun! 🥟</h1>
          </section>
        </Layout>
      </Document>
    )
  )
  .get("/styles.css", () => Bun.file("./public/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

const Document = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${APP_TITLE}</title>
  <script src="https://unpkg.com/htmx.org@1.9.4"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
  <link href="/styles.css" rel="stylesheet">
</head>

${children}
`;
