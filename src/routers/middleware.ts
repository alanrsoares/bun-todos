import { AppRouter } from "./base";

export const protectedRoutes =
  <T extends string | RegExp>(routePatterns: T[] = []) =>
  (app: AppRouter) =>
    app.onRequest(({ store, set, request }) => {
      const url = new URL(request.url);

      const isProtected = routePatterns.some((route) => {
        switch (typeof route) {
          case "string":
            return url.pathname.startsWith(route);
          case "object":
            return route.test(url.pathname);
          default:
            return false;
        }
      });

      if (!store.auth?.userId && isProtected) {
        set.status = 403;

        return "Unauthorized";
      }
    });
