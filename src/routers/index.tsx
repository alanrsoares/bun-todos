import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import Layout from "~/ui/Layout";
import HomePage from "~/pages";
import * as todosDB from "~/domain/todos/todos.repository";
import TodoList from "~/ui/TodoList";
import TodoItem from "~/ui/TodoItem";
import { Document } from "~/document";

const router = new Elysia()
  .use(html())
  // pages: index
  .get("/", ({ html }) =>
    html(
      <Document>
        <Layout>
          <HomePage />
        </Layout>
      </Document>
    )
  )
  .group("/todos", (todos) =>
    todos
      // get all todos
      .get("/", async ({ html }) => {
        const todos = await todosDB.getTodos();

        return html(<TodoList todos={todos} />);
      })
      // add a todo
      .post(
        "/",
        async ({ body }) => {
          const newTodo = await todosDB.addTodo(body.content);

          return <TodoItem {...newTodo} />;
        },
        {
          body: t.Object({
            content: t.String({ minLength: 1 }),
          }),
        }
      )
      // toggle a todo
      .post(
        "/toggle/:id",
        async ({ params }) => {
          const todo = await todosDB.toggleTodo(params.id);

          return <TodoItem {...todo} />;
        },
        {
          params: t.Object({
            id: t.String({ minLength: 1 }),
          }),
        }
      )
      // toggle all todos
      .post("/toggle", async () => {
        const todos = await todosDB.toggleAllTodos();

        return <TodoList todos={todos} />;
      })
      // delete a todo
      .delete(
        "/:id",
        ({ params }) => {
          todosDB.deleteTodo(params.id);
        },
        {
          params: t.Object({
            id: t.String({ minLength: 1 }),
          }),
        }
      )
      // clear completed todos
      .delete("/", async () => {
        const todos = await todosDB.clearCompletedTodos();

        return <TodoList todos={todos} />;
      })
  );

export default router;
