import * as elements from "typed-html";
import { cn } from "./utils";

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

type Attributes = Record<string, string | Promise<string>>;

type CreateElement = (
  classNames: TemplateStringsArray
) => (attributes?: Attributes, ...contents: string[]) => string;

function createTW() {
  return ELEMENT_KEYS.reduce(
    (acc, key) => {
      const createElement: CreateElement =
        (...classNames) =>
        (attributes?, ...contents) =>
          elements.createElement(
            key,
            {
              ...attributes,
              class: cn(attributes?.class, ...classNames),
            },
            ...contents
          );

      return { ...acc, [key]: createElement };
    },
    {} as Record<ElementKeys, CreateElement>
  );
}

const tw = createTW();

export default tw;
