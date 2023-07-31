import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import { APP_TITLE } from "./config";
import Layout from "./ui/Layout";
import HomePage from "./pages";
import { IN_MEMORY_STATE } from "./lib/todos";
import TodoList from "./ui/TodoList";

const app = new Elysia()
  .use(html())
  // pages: index
  .get("/", ({ html }) =>
    html(
      <Document>
        <Layout>
          <HomePage />
        </Layout>
      </Document>,
    ),
  )
  // todo list
  .get("/todos", ({ html }) => html(<TodoList todos={IN_MEMORY_STATE.todos} />))

  .get("/styles.css", () => Bun.file("./public/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
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
