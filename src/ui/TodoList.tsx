import * as elements from "typed-html";

import TodoItem from "./TodoItem";
import { ITodoItem } from "~/lib/todos";
import TodoForm from "./TodoForm";
import { PropsWithChildren } from "~/lib/tw";

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
