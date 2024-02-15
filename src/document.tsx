import * as elements from "typed-html";

import { APP_TITLE } from "./config";
import { Children } from "./lib/tw";

const SCRIPTS = [
  {
    name: "htmx.org",
    version: "1.9.10",
  },
  {
    name: "hyperscript.org",
    version: "0.9.11",
  },
];

const SCRIPTS_BLOCK = SCRIPTS.map(({ name, version }) => (
  <script src={`https://unpkg.com/${name}@${version}`} />
)).join("\n");

export const Document = ({ children }: { children: Children }) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${APP_TITLE}</title>
  ${SCRIPTS_BLOCK}
  <link href="/styles.css" rel="stylesheet">
</head>

${children}
`;
