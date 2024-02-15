import * as elements from "typed-html";

import { Document } from "~/document";
import { todosRouterMiddleware } from "~/domain/todos/todos.router";
import HomePage from "~/pages";
import Layout from "~/ui/Layout";

import { app } from "./base";

const router = app
  // pages: index
  .get("/", ({ html }) =>
    html(
      <Document>
        <Layout>
          <HomePage />
        </Layout>
      </Document>,
    ),
  )
  .use(todosRouterMiddleware);

export default router;
