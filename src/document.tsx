import { dark } from "@clerk/themes";
import * as elements from "typed-html";

import { APP_TITLE } from "./config";
import { PropsWithChildren } from "./lib/tw";

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

const CLERK_BLOCK = `
<script>
  // Get this URL and Publishable Key from the Clerk Dashboard
  const clerkPublishableKey = "${process.env.CLERK_PUBLISHABLE_KEY}";
  const frontendApi = 'classic-termite-73.clerk.accounts.dev';
  const version = '@latest'; // Set to appropriate version
 
  // Creates asynchronous script
  const script = document.createElement('script');
  script.setAttribute('data-clerk-frontend-api', frontendApi);
  script.setAttribute('data-clerk-publishable-key', clerkPublishableKey);
  script.async = true;
  script.src = \`https://\${frontendApi}/npm/@clerk/clerk-js\${version}/dist/clerk.browser.js\`;
 
  // Adds listener to initialize ClerkJS after it's loaded
  script.addEventListener('load', async function () {
    await window.Clerk.load({
      // Set load options here...
      baseTheme: ${JSON.stringify(dark)},
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
  <link href="/styles.css" rel="stylesheet">
</head>
  
${children}
${CLERK_BLOCK}

</html>
`;
