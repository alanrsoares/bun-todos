import { t } from "elysia";
import invariant from "tiny-invariant";
import * as elements from "typed-html";

import { AppRouter } from "~/routers/base";
import { protectedRoutes } from "~/routers/middleware";
import TodoItem from "~/ui/TodoItem";
import TodoList from "~/ui/TodoList";

import * as todosDB from "./todos.repository";

export function todosRouter(app: AppRouter) {
  return app.group("/todos", (todos) =>
    todos
      .use(protectedRoutes([/^\/todos/]))
      // get all todos
      .get("/", async ({ html, store }) => {
        invariant(store.auth?.userId, "User must be authenticated");

        const todos = await todosDB.getTodos(store.auth.userId);

        return html(<TodoList todos={todos} />);
      })
      // add a todo
      .post(
        "/",
        async ({ body, store }) => {
          invariant(store.auth?.userId, "User must be authenticated");

          const newTodo = await todosDB.addTodo({
            content: body.content,
            userId: store.auth.userId,
          });

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
        async ({ params, store }) => {
          invariant(store.auth?.userId, "User must be authenticated");

          const todo = await todosDB.toggleTodo({
            id: params.id,
            userId: store.auth.userId,
          });

          return <TodoItem {...todo} />;
        },
        {
          params: t.Object({
            id: t.String({ minLength: 1 }),
          }),
        },
      )
      // toggle all todos
      .post("/toggle", async ({ store }) => {
        invariant(store.auth?.userId, "User must be authenticated");

        const todos = await todosDB.toggleAllTodos(store.auth.userId);

        return <TodoList todos={todos} />;
      })
      // delete a todo
      .delete(
        "/:id",
        ({ params, store }) => {
          invariant(store.auth?.userId, "User must be authenticated");

          todosDB.deleteTodo({
            id: params.id,
            userId: store.auth.userId,
          });
        },
        {
          params: t.Object({
            id: t.String({ minLength: 1 }),
          }),
        },
      )
      // clear completed todos
      .delete("/", async ({ store }) => {
        invariant(store.auth?.userId, "User must be authenticated");

        const todos = await todosDB.clearCompletedTodos(store.auth.userId);

        return <TodoList todos={todos} />;
      }),
  );
}
