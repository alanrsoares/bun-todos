import * as elements from "typed-html";

import { Document } from "~/document";
import { todosRouter } from "~/domain/todos/todos.router";
import AuthenticatedPage from "~/pages/authenticated";
import UnauthenticatedPage from "~/pages/unauthenticated";
import Layout from "~/ui/Layout";

import { app } from "./base";

const router = app
  // pages: index
  .get("/", async ({ html, clerk, store }) => {
    const userId = store.auth?.userId ?? null;

    if (!userId) {
      return html(
        <Document>
          <Layout>
            <UnauthenticatedPage />
          </Layout>
        </Document>,
      );
    }

    const user = await clerk.users.getUser(userId);

    return html(
      <Document>
        <Layout>
          <AuthenticatedPage user={user} />
        </Layout>
      </Document>,
    );
  })
  // compose domain routers
  .use(todosRouter);

export default router;
