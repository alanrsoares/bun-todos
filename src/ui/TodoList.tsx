import * as elements from "typed-html";

import TodoItem from "./TodoItem";
import { ITodoItem } from "~/domain/todos/todos.repository";
import TodoForm from "./TodoForm";
import { PropsWithChildren } from "~/lib/tw";

type Props = PropsWithChildren<{
  todos: ITodoItem[];
}>;

export default function TodoList({ todos }: Props) {
  return (
    <div class="space-y-4" id="todo-list">
      {todos.map(TodoItem)}
      <TodoForm />
      <div class="flex justify-evenly items-center">
        <a
          href=""
          class="btn-link"
          hx-delete="/todos"
          hx-swap="outerHTML"
          // should targer the parent div
          hx-target="#todo-list"
        >
          clear completed
        </a>
        <a
          href=""
          class="btn-link"
          hx-post="/todos/toggle"
          hx-swap="outerHTML"
          hx-target="#todo-list"
        >
          togle all
        </a>
      </div>
    </div>
  );
}
