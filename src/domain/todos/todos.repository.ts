import { eq } from "drizzle-orm";
import { partition } from "rambda";
import { Todo, todosTable } from "~/drizzle/schema";

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

export async function addTodo(content: string): Promise<ITodoItem> {
  const [result] = await db
    .insert(todosTable)
    .values({
      content,
      completed: "false",
    })
    .returning({ id: todosTable.id })
    .execute();

  return {
    id: result.id,
    content,
    completed: false,
  };
}

export async function toggleTodo(id: string): Promise<ITodoItem> {
  const todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get();
  if (!todo) {
    throw new Error(`Todo with id ${id} not found!`);
  }

  const completed = todo.completed === "true" ? "false" : "true";

  await db
    .update(todosTable)
    .set({ completed })
    .where(eq(todosTable.id, id))
    .execute();

  return toTodoItem({ ...todo, completed });
}

export async function deleteTodo(id: string) {
  await db.delete(todosTable).where(eq(todosTable.id, id)).execute();

  return id;
}

export async function clearCompletedTodos(): Promise<ITodoItem[]> {
  await db.delete(todosTable).where(eq(todosTable.completed, "true")).execute();

  const pendingTodos = await db.select().from(todosTable).all();

  return pendingTodos.map(toTodoItem);
}

export async function toggleAllTodos(): Promise<ITodoItem[]> {
  const todos = await db.select().from(todosTable).all();

  const [completed, pending] = partition(
    (todo) => todo.completed === "true",
    todos
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
    updatedTodos.map((todo) =>
      db
        .update(todosTable)
        .set({ completed: todo.completed })
        .where(eq(todosTable.id, todo.id))
        .execute()
    )
  );

  return updatedTodos.map(toTodoItem);
}

export async function getTodos(): Promise<ITodoItem[]> {
  const todos = await db.select().from(todosTable).all();

  const asTodoItem = todos.map((todo) => ({
    id: todo.id,
    content: todo.content ?? "",
    completed: todo.completed === "true",
  }));

  return asTodoItem;
}

export async function getTodosByCompleted(
  completed: boolean
): Promise<ITodoItem[]> {
  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.completed, completed ? "true" : "false"))
    .all();

  return todos.map(toTodoItem);
}
