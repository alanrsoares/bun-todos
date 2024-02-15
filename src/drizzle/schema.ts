import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: text("id").primaryKey(),
  content: text("content"),
  completed: text("completed").default("false"),
});
