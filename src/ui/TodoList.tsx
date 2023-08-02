import * as elements from "typed-html";

import { PropsWithChildren } from "~/types";
import TodoItem from "./TodoItem";
import { ITodoItem } from "~/lib/todos";
import TodoForm from "./TodoForm";

type Props = PropsWithChildren<{
  todos: ITodoItem[];
}>;

export default function TodoList({ todos }: Props) {
  return (
    <div class="space-y-4">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}
