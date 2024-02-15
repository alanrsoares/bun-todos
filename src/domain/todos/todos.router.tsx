import { t } from "elysia";
import * as elements from "typed-html";

import { BaseApp } from "~/routers/base";
import TodoItem from "~/ui/TodoItem";
import TodoList from "~/ui/TodoList";

import * as todosDB from "./todos.repository";

export function todosRouterMiddleware(app: BaseApp) {
  return app.group("/todos", (todos) =>
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
        },
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
        },
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
        },
      )
      // clear completed todos
      .delete("/", async () => {
        const todos = await todosDB.clearCompletedTodos();

        return <TodoList todos={todos} />;
      }),
  );
}
