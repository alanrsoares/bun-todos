import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";
import { APP_TITLE } from "./config";
import Layout from "./ui/Layout";

const IN_MEMORY_STATE = {
  name: "Bun",
};

const HelloForm = ({ name }: { name: string }) => (
  <form hx-put="/contact" hx-target="this" hx-swap="outerHTML">
    <div hx-target="this" hx-swap="outerHTML">
      <div>
        <label>Name</label>:
        <input class="input input-sm" type="text" name="name" value={name} />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
      <button class="btn" hx-get="/contact">
        Cancel
      </button>
    </div>
  </form>
);

const HelloWorld = ({ name }: { name: string }) => (
  <div hx-target="this" hx-swap="outerHTML">
    <div>
      <label>Name</label>: <span class="input input-sm"> {name}</span>
    </div>
    <button hx-get="/contact/edit" class="btn btn-primary">
      Click To Edit
    </button>
  </div>
);

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <Document>
        <Layout>
          <section>
            <h1 class="text-accent">Hello, Bun! 🥟</h1>
          </section>
          <HelloWorld name={IN_MEMORY_STATE.name} />
        </Layout>
      </Document>
    )
  )
  .get("/contact/edit", ({ html }) => {
    return html(<HelloForm name={IN_MEMORY_STATE.name} />);
  })
  .put(
    "/contact",
    ({ html, body }) => {
      IN_MEMORY_STATE.name = body.name;

      return html(<HelloWorld name={body.name ?? "no name"} />);
    },
    {
      body: t.Object({ name: t.String() }),
    }
  )
  .get("/styles.css", () => Bun.file("./public/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

const Document = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${APP_TITLE}</title>
  <script src="https://unpkg.com/htmx.org@1.9.4"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
  <link href="/styles.css" rel="stylesheet">
</head>

${children}
`;
