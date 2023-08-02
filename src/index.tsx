import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import { APP_TITLE } from "./config";
import Layout from "./ui/Layout";
import HomePage from "./pages";
import { IN_MEMORY_STATE, addTodo, toggleTodo, removeTodo } from "./lib/todos";
import TodoList from "./ui/TodoList";
import TodoItem from "./ui/TodoItem";

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
  // get all todos
  .get("/todos", ({ html }) => html(<TodoList todos={IN_MEMORY_STATE.todos} />))
  // add a todo
  .post(
    "/todos",
    ({ body }) => {
      const newTodo = addTodo(body.content, IN_MEMORY_STATE);

      return <TodoItem {...newTodo} />;
    },
    {
      body: t.Object({
        content: t.String({ minLength: 1 }),
      }),
    },
  )
  // toggle a todo
  .post(
    "/todos/toggle/:id",
    ({ params }) => {
      const todo = toggleTodo(params.id, IN_MEMORY_STATE);

      return <TodoItem {...todo} />;
    },
    {
      params: t.Object({
        id: t.String({ minLength: 1 }),
      }),
    },
  )
  // delete a todo
  .delete(
    "/todos/:id",
    ({ params }) => {
      removeTodo(params.id, IN_MEMORY_STATE);
    },
    {
      params: t.Object({
        id: t.String({ minLength: 1 }),
      }),
    },
  )
  .get("/styles.css", () => Bun.file("./public/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
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
