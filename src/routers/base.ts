import { html } from "@elysiajs/html";
import { Elysia } from "elysia";

export const app = new Elysia().use(html());

export type BaseApp = typeof app;
