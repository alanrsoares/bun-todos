import type { User } from "@clerk/backend";
import * as elements from "typed-html";

import { FC, PropsWithChildren } from "~/lib/tw";

import { SignOutButton } from "./auth";
import { Clamp } from "./components";

type Props = PropsWithChildren<{
  user?: User;
}>;

export default function Layout({ user, children }: Props) {
  return (
    <div class="flex min-h-[100dvh] flex-col gap-4">
      <Header user={user} />
      <main class="flex flex-1">
        <Clamp class="container mx-auto flex flex-1">{children}</Clamp>
      </main>
    </div>
  );
}

const Header: FC<
  JSX.HtmlTag & {
    user?: User;
  }
> = ({ user, ...props }) => (
  <header class="navbar bg-base-200 ring-1" {...props}>
    <div class="navbar-start">
      <BrandLink href="/">Bun ToDo's</BrandLink>
    </div>
    {user && (
      <div class="navbar-end gap-2">
        Welcome, {user.firstName} <SignOutButton size="sm" />
      </div>
    )}
  </header>
);

const BrandLink: FC<JSX.HtmlAnchorTag> = ({ children, ...props }) => (
  <a class="btn btn-ghost" {...props}>
    <div class="avatar grid h-6 w-6 place-items-center rounded-full bg-error ring ring-neutral">
      🥟
    </div>
    {children}
  </a>
);
