import { and, eq } from "drizzle-orm";
import { indexBy, partition, prop } from "rambda";

import { NewTodo, Todo, todosTable } from "~/drizzle/schema";
import db, { Database } from "~/services/db";

export type ITodoItem = {
  id: string;
  content: string;
  completed: boolean;
};

const toTodoItem = ({ id, content, completed }: Todo): ITodoItem => ({
  id,
  content,
  completed: completed === "true",
});

export class TodosRepository {
  constructor(
    private db: Database,
    private table: typeof todosTable,
  ) {}

  async addTodo(
    input: Pick<NewTodo, "userId" | "content">,
  ): Promise<ITodoItem> {
    const [result] = await this.db
      .insert(this.table)
      .values({
        userId: input.userId,
        content: input.content,
        completed: "false",
      })
      .returning({ id: this.table.id })
      .execute();

    return {
      id: result.id,
      content: input.content,
      completed: false,
    };
  }

  async toggleTodo(input: Pick<Todo, "id" | "userId">): Promise<ITodoItem> {
    const todo = await this.db
      .select()
      .from(this.table)
      .where(
        and(eq(this.table.id, input.id), eq(this.table.userId, input.userId)),
      )
      .get();

    // if todo is not found, either it was deleted or it doesn't belong to the user
    if (!todo) {
      throw new Error(`Todo with id ${input.id} not found!`);
    }

    const completed = todo.completed === "true" ? "false" : "true";

    await this.db
      .update(this.table)
      .set({ completed })
      .where(eq(this.table.id, input.id))
      .execute();

    return toTodoItem({ ...todo, completed });
  }

  async deleteTodo(input: Pick<Todo, "id" | "userId">): Promise<string> {
    await this.db
      .delete(this.table)
      .where(
        and(eq(this.table.id, input.id), eq(this.table.userId, input.userId)),
      )
      .execute();

    return input.id;
  }

  async clearCompletedTodos(userId: NewTodo["userId"]): Promise<ITodoItem[]> {
    await this.db
      .delete(this.table)
      .where(
        and(eq(this.table.userId, userId), eq(this.table.completed, "true")),
      )
      .execute();

    const pendingTodos = await this.db
      .select()
      .from(this.table)
      .where(
        and(eq(this.table.userId, userId), eq(this.table.completed, "false")),
      )
      .all();

    return pendingTodos.map(toTodoItem);
  }

  async toggleAllTodos(userId: NewTodo["userId"]): Promise<ITodoItem[]> {
    const todos = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.userId, userId))
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
        this.db
          .update(this.table)
          .set({ completed: completed })
          .where(and(eq(this.table.id, id), eq(this.table.userId, userId)))
          .execute(),
      ),
    );

    const updatedIndexedById = indexBy(prop("id"), updatedTodos);

    return todos.map((x) => updatedIndexedById[x.id] ?? x).map(toTodoItem);
  }

  async getTodos(userId: NewTodo["userId"]): Promise<ITodoItem[]> {
    const todos = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.userId, userId))
      .all();

    return todos.map(toTodoItem);
  }
}

const todosRepository = new TodosRepository(db, todosTable);

export default todosRepository;
