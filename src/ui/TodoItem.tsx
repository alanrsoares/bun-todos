import * as elements from "typed-html";

import { PropsWithChildren } from "~/types";
import { ITodoItem } from "~/lib/todos";
import { TrashIcon } from "./icons";

type Props = PropsWithChildren<ITodoItem>;

export default function TodoItem({ completed, id, content }: Props) {
  return (
    <div class="flex flex-row space-x-3 items-center w-full justify-between">
      <label class="flex spaxe-x-3 flex-1">
        <div class="flex-1">{content}</div>
        <input
          type="checkbox"
          checked={completed}
          hx-post={`/todos/toggle/${id}`}
          hx-swap="outerHTML"
          hx-target="closest div"
        />
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
