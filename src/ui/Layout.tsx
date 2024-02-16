import type { User } from "@clerk/backend";
import * as elements from "typed-html";

import { FC, PropsWithChildren } from "~/lib/tw";
import { cn } from "~/lib/utils";

import { SignOutButton } from "./auth";
import { Clamp, Drawer, Menu } from "./components";

const DRAWER_ID = "my-drawer";

type Props = PropsWithChildren<{
  user?: User;
}>;

export default function Layout({ user, children }: Props) {
  return (
    <Drawer class>
      <input id={DRAWER_ID} type="checkbox" class="drawer-toggle" />
      <Drawer.Content>
        <div class="flex min-h-[100dvh] flex-col gap-4">
          <Header user={user} />
          <main class="flex flex-1">
            <Clamp class="container mx-auto flex flex-1">{children}</Clamp>
          </main>
        </div>
      </Drawer.Content>
      {user && (
        <Drawer.Side>
          <Drawer.Overlay for={DRAWER_ID} aria-label="close sidebar" />
          <Menu class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <Menu.Title>
              <a>Welcome, {user.firstName}</a>
            </Menu.Title>
          </Menu>
        </Drawer.Side>
      )}
    </Drawer>
  );
}

const Header: FC<
  JSX.HtmlTag & {
    user?: User;
  }
> = ({ user, ...props }) => (
  <header class="navbar bg-base-200 ring-1" {...props}>
    <div class="navbar-start">
      <BrandLink href="/" class="hidden sm:inline-flex">
        Bun ToDos
      </BrandLink>
      <label for={DRAWER_ID} class="drawer-button">
        <BrandLink
          class="pointer-events-none inline-flex sm:hidden"
          _="on click halt"
        >
          Bun ToDos
        </BrandLink>
      </label>
    </div>
    {user && (
      <div class="navbar-end items-center gap-4">
        <span class="hidden sm:inline-block">Welcome, {user.firstName}</span>{" "}
        <SignOutButton size="sm" />
        {user.imageUrl && (
          <div class="avatar">
            <div class="mx-1 w-9 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 sm:w-10">
              <img src={user.imageUrl} alt={`${user.firstName}'s avatar`} />
            </div>
          </div>
        )}
      </div>
    )}
  </header>
);

const BrandLink: FC<JSX.HtmlAnchorTag> = ({
  children,
  class: className,
  ...props
}) => (
  <a class={cn("btn btn-ghost", className)} {...props}>
    <div class="avatar grid h-8 w-8 place-items-center rounded-full bg-secondary/80 p-1 ring ring-neutral">
      <img src="/icon.svg" alt="Bun ToDos" />
    </div>
    {children}
  </a>
);
