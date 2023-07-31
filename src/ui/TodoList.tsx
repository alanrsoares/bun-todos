import * as elements from "typed-html";

import { PropsWithChildren } from "~/types";
import TodoItem from "./TodoItem";
import { ITodoItem } from "~/lib/todos";

type Props = PropsWithChildren<{
  todos: ITodoItem[];
}>;

export default function TodoList({ todos }: Props) {
  return (
    <ul class="space-y-2">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </ul>
  );
}
