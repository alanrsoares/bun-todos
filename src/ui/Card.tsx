import * as elements from "typed-html";
import { cn } from "~/lib/utils";
import { HxProps } from "~/types";
import { PropsWithChildren } from "~/types";

type CardProps = PropsWithChildren<
  elements.Attributes &
    HxProps & {
      title?: JSX.Element;
    }
>;

const Card = (props: CardProps) => (
  <div {...props} class={cn("card", props.class)}>
    {props.children}
  </div>
);

export default Object.assign(Card, {
  Title: (props: PropsWithChildren<HxProps>) => (
    <div {...props} class={cn("card-title", props.class)}>
      {props.children}
    </div>
  ),
  Body: (props: PropsWithChildren<HxProps>) => (
    <div {...props} class={cn("card-body", props.class)}>
      {props.children}
    </div>
  ),
  Actions: (props: PropsWithChildren<HxProps>) => (
    <div {...props} class={cn("card-actions", props.class)}>
      {props.children}
    </div>
  ),
});
