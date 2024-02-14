import * as elements from "typed-html";

import { PropsWithChildren } from "~/types";
import { ITodoItem } from "~/lib/todos";
import { TrashIcon } from "./icons";
import { HxProps } from "~/types";

type Props = PropsWithChildren<ITodoItem>;

export default function TodoItem({ completed, id, content }: Props) {
  return (
    <div class="flex flex-row space-x-3 items-center w-full justify-between">
      <label class="flex spaxe-x-3 flex-1">
        <div class="flex-1">{content}</div>
        <Chekbox checked={completed} id={id} />
      </label>
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

function Chekbox(props: CheckboxProps) {
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
