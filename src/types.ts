import * as elements from "typed-html";

export type PropsWithChildren<P = {}> = P & { children?: elements.Children };

export type FC<P = elements.Attributes> = (
  props: PropsWithChildren<P>
) => string;

export type HxProps = elements.Attributes &
  Partial<{
    "hx-delete": string;
    "hx-swap": string;
    "hx-target": string;
    "hx-post": string;
  }>;

export type Children = JSX.Element | JSX.Element[];
