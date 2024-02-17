import * as elements from "typed-html";

import { ITodoItem } from "~/domain/todos/todos.repository";
import tw, { HxProps } from "~/lib/tw";

import { TrashIcon } from "./icons";

type Props = ITodoItem;

export default function TodoItem({ completed, id, content }: Props) {
  return (
    <div class="flex w-full flex-row items-center justify-between space-x-3">
      <TodoLabel class="flex flex-1 cursor-pointer" completed={completed}>
        <div class="flex-1">{content}</div>
        <Checkbox checked={completed} id={id} />
      </TodoLabel>
      <button
        class="text-red-500 hover:text-red-200"
        hx-delete={`/todos/${id}`}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

type CheckboxProps = HxProps & { checked: boolean; id: string };

function Checkbox(props: CheckboxProps) {
  return (
    <input
      class="checkbox hover:bg-gray-700"
      type="checkbox"
      checked={props.checked}
      hx-post={`/todos/toggle/${props.id}`}
      hx-swap="outerHTML"
      hx-target="closest div"
    />
  );
}

const TodoLabel = tw.label.cva("label", {
  variants: {
    completed: {
      true: "line-through",
    },
  },
});
