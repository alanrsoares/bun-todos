import { and, eq } from "drizzle-orm";
import { indexBy, partition, prop } from "rambda";

import { NewTodo, Todo, todosTable } from "~/drizzle/schema";
import db from "~/services/db";

export type ITodoItem = {
  id: string;
  content: string;
  completed: boolean;
};

const toTodoItem = (todo: Todo): ITodoItem => ({
  id: todo.id,
  content: todo.content ?? "",
  completed: todo.completed === "true",
});

export async function addTodo(
  input: Pick<NewTodo, "userId" | "content">,
): Promise<ITodoItem> {
  const [result] = await db
    .insert(todosTable)
    .values({
      userId: input.userId,
      content: input.content,
      completed: "false",
    })
    .returning({ id: todosTable.id })
    .execute();

  return {
    id: result.id,
    content: input.content,
    completed: false,
  };
}

export async function toggleTodo(
  input: Pick<Todo, "id" | "userId">,
): Promise<ITodoItem> {
  const todo = await db
    .select()
    .from(todosTable)
    .where(
      and(eq(todosTable.id, input.id), eq(todosTable.userId, input.userId)),
    )
    .get();

  // if todo is not found, either it was deleted or it doesn't belong to the user
  if (!todo) {
    throw new Error(`Todo with id ${input.id} not found!`);
  }

  const completed = todo.completed === "true" ? "false" : "true";

  await db
    .update(todosTable)
    .set({ completed })
    .where(eq(todosTable.id, input.id))
    .execute();

  return toTodoItem({ ...todo, completed });
}

export async function deleteTodo(
  input: Pick<Todo, "id" | "userId">,
): Promise<string> {
  await db
    .delete(todosTable)
    .where(
      and(eq(todosTable.id, input.id), eq(todosTable.userId, input.userId)),
    )
    .execute();

  return input.id;
}

export async function clearCompletedTodos(
  userId: NewTodo["userId"],
): Promise<ITodoItem[]> {
  await db
    .delete(todosTable)
    .where(and(eq(todosTable.userId, userId), eq(todosTable.completed, "true")))
    .execute();

  const pendingTodos = await db
    .select()
    .from(todosTable)
    .where(
      and(eq(todosTable.userId, userId), eq(todosTable.completed, "false")),
    )
    .all();

  return pendingTodos.map(toTodoItem);
}

export async function toggleAllTodos(
  userId: NewTodo["userId"],
): Promise<ITodoItem[]> {
  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId))
    .all();

  const [completed, pending] = partition(
    (todo) => todo.completed === "true",
    todos,
  );

  const allTodosCompleted = pending.length === 0;

  const updatedTodos = allTodosCompleted
    ? completed.map((todo) => ({
        ...todo,
        content: todo.content ?? "",
        completed: "false",
      }))
    : pending.map((todo) => ({
        ...todo,
        content: todo.content ?? "",
        completed: "true",
      }));

  await Promise.all(
    updatedTodos.map(({ completed, id }) =>
      db
        .update(todosTable)
        .set({ completed: completed })
        .where(and(eq(todosTable.id, id), eq(todosTable.userId, userId)))
        .execute(),
    ),
  );

  const updatedIndexedById = indexBy(prop("id"), updatedTodos);

  return todos.map((x) => updatedIndexedById[x.id] ?? x).map(toTodoItem);
}

export async function getTodos(
  userId: NewTodo["userId"],
): Promise<ITodoItem[]> {
  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId))
    .all();

  return todos.map((todo) => ({
    id: todo.id,
    content: todo.content ?? "",
    completed: todo.completed === "true",
  }));
}

export async function getTodosByCompleted(
  input: Pick<Todo, "userId" | "completed">,
): Promise<ITodoItem[]> {
  const todos = await db
    .select()
    .from(todosTable)
    .where(
      and(
        eq(todosTable.completed, input.completed ? "true" : "false"),
        eq(todosTable.userId, input.userId),
      ),
    )
    .all();

  return todos.map(toTodoItem);
}
