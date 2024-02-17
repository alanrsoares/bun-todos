import * as elements from "typed-html";

import { ITodoItem } from "~/domain/todos/todos.repository";
import tw, { PropsWithChildren } from "~/lib/tw";

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

type Props = PropsWithChildren<{
  todos: ITodoItem[];
}>;

export default function TodoList({ todos }: Props) {
  return (
    <div class="space-y-4" id="todo-list">
      {todos.map(TodoItem)}
      <TodoForm />
      <div class="flex items-center justify-evenly">
        <LinkButton
          href=""
          hx-delete="/todos"
          hx-swap="outerHTML"
          hx-target="#todo-list"
        >
          clear completed
        </LinkButton>
        <LinkButton
          href=""
          hx-post="/todos/toggle"
          hx-swap="outerHTML"
          hx-target="#todo-list"
        >
          toggle all
        </LinkButton>
      </div>
    </div>
  );
}

const LinkButton = tw.a`btn-link`;
