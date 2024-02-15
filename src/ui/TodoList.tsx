import * as elements from "typed-html";

import { ITodoItem } from "~/domain/todos/todos.repository";
import { PropsWithChildren } from "~/lib/tw";

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

type Props = PropsWithChildren<{
  todos: ITodoItem[];
}>;

export default function TodoList({ todos }: Props) {
  return (
    <div class="space-y-4" id="todo-list">
      {todos.length ? todos.map(TodoItem) : <div>Nothing to do yet</div>}
      <TodoForm />
      <div class="flex items-center justify-evenly">
        <a
          href=""
          class="btn-link"
          hx-delete="/todos"
          hx-swap="outerHTML"
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
