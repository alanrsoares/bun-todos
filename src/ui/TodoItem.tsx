import * as elements from "typed-html";

import { PropsWithChildren } from "~/types";
import { Button } from "./core";
import { ITodoItem } from "~/lib/todos";
import clsx from "clsx";
import { TrashIcon } from "./icons";

type Props = PropsWithChildren<ITodoItem>;

export default function TodoItem({ completed, id, title }: Props) {
  return (
    <li class="flex justify-between items-center p-2 pl-4 hover:bg-base-100/90 transition-colors rounded-lg">
      <span
        class={clsx({
          "line-through": completed,
        })}
      >
        {title}
      </span>
      <Button>
        <TrashIcon/>
      </Button>
    </li>
  );
}
