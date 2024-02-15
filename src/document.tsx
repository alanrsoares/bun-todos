import * as elements from "typed-html";
import { Children } from "./lib/tw";
import { APP_TITLE } from "./config";

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

export const Document = ({ children }: { children: Children }) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${APP_TITLE}</title>
  ${SCRIPTS.map(({ name, version }) => (
    <script src={`https://unpkg.com/${name}@${version}`} />
  )).join("\n")}
  <link href="/styles.css" rel="stylesheet">
</head>

${children}
`;
