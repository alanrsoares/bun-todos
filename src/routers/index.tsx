import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import Layout from "../ui/Layout";
import HomePage from "../pages";
import * as todosDB from "../domain/todos/todos.repository";
import TodoList from "../ui/TodoList";
import TodoItem from "../ui/TodoItem";
import { Document } from "../document";

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
  // get all todos
  .get("/todos", async ({ html }) => {
    const todos = await todosDB.getTodos();

    return html(<TodoList todos={todos} />);
  })
  // add a todo
  .post(
    "/todos",
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
    "/todos/toggle/:id",
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
  .post("/todos/toggle", async () => {
    const todos = await todosDB.toggleAllTodos();

    return <TodoList todos={todos} />;
  })
  // delete a todo
  .delete(
    "/todos/:id",
    ({ params }) => {
      todosDB.removeTodo(params.id);
    },
    {
      params: t.Object({
        id: t.String({ minLength: 1 }),
      }),
    }
  )
  // clean completed todos
  .delete("/todos", async () => {
    const todos = await todosDB.clearCompletedTodos();

    return <TodoList todos={todos} />;
  })
  .get("/styles.css", () => Bun.file("./public/styles.css"))
  .listen(3000);

export default router;
