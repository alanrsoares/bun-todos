import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const app = new Elysia().use(html()).use(clerkPlugin());

export type BaseApp = typeof app;
