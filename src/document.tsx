import { dark } from "@clerk/themes";
import * as elements from "typed-html";

import { APP_TITLE } from "./config";
import { PropsWithChildren } from "./lib/tw";

const SCRIPTS = [
  {
    name: "htmx.org",
    version: "1.9.11",
  },
  {
    name: "hyperscript.org",
    version: "0.9.11",
  },
  {
    name: "alpinejs",
    version: "latest",
    defer: true,
  },
];

const SCRIPTS_BLOCK = SCRIPTS.map(({ name, version, defer }) => (
  <script
    src={`https://unpkg.com/${name}@${version}`}
    defer={defer ? "defer" : ""}
  />
)).join("\n");

const theme = JSON.stringify(dark, null, 2);

const CLERK_BLOCK = `
<script>
  const clerkPublishableKey = "${process.env.CLERK_PUBLISHABLE_KEY}";
  const frontendApi = 'classic-termite-73.clerk.accounts.dev';
  const version = '@latest'; // Set to appropriate version
  const script = document.createElement('script');
  
  script.setAttribute('data-clerk-frontend-api', frontendApi);
  script.setAttribute('data-clerk-publishable-key', clerkPublishableKey);
  script.async = true;
  script.src = \`https://\${frontendApi}/npm/@clerk/clerk-js\${version}/dist/clerk.browser.js\`;
 
  script.addEventListener('load', async function () {
    await window.Clerk.load({
      appearance: {
        baseTheme: ${theme},
      }
    });
  });

  document.body.appendChild(script);
</script>
`;

type DocumentProps = PropsWithChildren;

export const Document = ({ children }: DocumentProps) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${APP_TITLE}</title>
  ${SCRIPTS_BLOCK}
  <link href="/styles.css" rel="stylesheet" >
  <link rel="icon" type="image/svg+xml" href="icon.svg" >
</head>
  <body>
${children}
  </body>
${CLERK_BLOCK}

</html>
`;
