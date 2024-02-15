import * as elements from "typed-html";
import { cn } from "./utils";
import { VariantProps, cva } from "class-variance-authority";

type ElementKeys = keyof JSX.IntrinsicElements;

export const ELEMENT_KEYS: ReadonlyArray<ElementKeys> = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
];

export type Children = string | Promise<string> | null | undefined;

export type PropsWithChildren<P = {}> = P & { children?: Children };

export type FC<P = elements.Attributes> = (
  props: PropsWithChildren<P>
) => null | string;

export type HxProps = elements.Attributes &
  Partial<{
    "hx-delete": string;
    "hx-swap": string;
    "hx-target": string;
    "hx-post": string;
  }>;

export type Attributes = Record<
  string,
  number | boolean | Children | Children[]
>;

export type RenderElement<T = {}> = (
  attributes?: Attributes & T,
  ...contents: string[]
) => string;

export type CreateElement = (classNames: TemplateStringsArray) => RenderElement;

type CVA<T = any> = typeof cva<T>;

function createTW() {
  return ELEMENT_KEYS.reduce(
    (acc, key) => {
      const cvaExtension = (...args: Parameters<CVA>) => {
        const variance = cva(...args);

        return (
          attributes: Attributes & VariantProps<typeof variance>,
          ...contents: string[]
        ) =>
          elements.createElement(
            key,
            {
              ...attributes,
              class: cn(attributes?.class, variance(attributes)),
            },
            ...contents
          );
      };

      const createElement = Object.assign(
        ((...classNames) =>
          (attributes?, ...contents) =>
            elements.createElement(
              key,
              {
                ...attributes,
                class: cn(attributes?.class, ...classNames),
              },
              ...contents
            )) satisfies CreateElement,
        {
          cva: cvaExtension,
        }
      );

      return { ...acc, [key]: createElement };
    },
    {} as Record<
      ElementKeys,
      CreateElement & {
        cva: <T>(
          ...args: Parameters<CVA<T>>
        ) => RenderElement<VariantProps<ReturnType<CVA<T>>>>;
      }
    >
  );
}

const tw = createTW();

export default tw;

export type ComponentProps<T> = T extends (props: infer P) => any ? P : never;
