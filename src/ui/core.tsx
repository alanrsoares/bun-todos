import clsx from "clsx";
import * as elements from "typed-html";
import { FC, PropsWithChildren } from "~/types";

export const Clamp: FC<elements.Attributes> = ({
  class: className,
  ...props
}) => (
  <div class={clsx("container mx-auto w-full", className)}>
    {props.children}
  </div>
);

export const Button: FC<elements.Attributes> = ({
  class: className,
  ...props
}) => (
  <button class={clsx("btn", className)} {...props}>
    {props.children}
  </button>
);
