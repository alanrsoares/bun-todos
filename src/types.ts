import * as elements from "typed-html";

export type PropsWithChildren<P = {}> = P & { children?: elements.Children };

export type FC<P = elements.Attributes> = (
  props: PropsWithChildren<P>
) => string;
