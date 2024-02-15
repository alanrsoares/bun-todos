import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import Layout from "../ui/Layout";
import HomePage from "../pages";
import {
  IN_MEMORY_STATE,
  addTodo,
  toggleTodo,
  removeTodo,
  toggleAllTodos,
  clearCompletedTodos,
} from "../services/todos";
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
    }
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
    }
  )
  // toggle all todos
  .post("/todos/toggle", () => {
    const todos = toggleAllTodos(IN_MEMORY_STATE);

    return <TodoList todos={todos} />;
  })
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
    }
  )
  // clean completed todos
  .delete("/todos", () => {
    const todos = clearCompletedTodos(IN_MEMORY_STATE);

    return <TodoList todos={todos} />;
  })
  .get("/styles.css", () => Bun.file("./public/styles.css"))
  .listen(3000);

export default router;
