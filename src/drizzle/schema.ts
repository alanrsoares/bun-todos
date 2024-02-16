import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  content: text("content").notNull(),
  completed: text("completed").default("false"),
  userId: text("user_id").notNull(),
});

export type Todo = InferSelectModel<typeof todosTable>;

export type NewTodo = InferInsertModel<typeof todosTable>;

// helpers

export const uuid = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
