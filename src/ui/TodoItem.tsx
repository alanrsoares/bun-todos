import * as elements from "typed-html";

import { ITodoItem } from "~/services/todos";
import { TrashIcon } from "./icons";
import tw, { HxProps } from "~/lib/tw";

type Props = ITodoItem;

export default function TodoItem({ completed, id, content }: Props) {
  return (
    <div class="flex flex-row space-x-3 items-center w-full justify-between">
      <TodoLabel class="flex spaxe-x-3 flex-1" completed={completed}>
        <div class="flex-1">{content}</div>
        <Checkbox checked={completed} id={id} />
      </TodoLabel>
      <button
        class="text-red-500"
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
      class="checkbox"
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
