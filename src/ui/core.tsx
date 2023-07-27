import clsx from "clsx";
import * as elements from "typed-html";
import { FC, PropsWithChildren } from "~/types";

export const Clamp: FC<elements.Attributes> = (props) => (
  <div class={clsx("container mx-auto w-full", props.class)}>
    {props.children}
  </div>
);
