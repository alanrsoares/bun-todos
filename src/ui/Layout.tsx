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
      <BrandLink href="/">Bun ToDos</BrandLink>
    </div>
    {user && (
      <div class="navbar-end gap-4">
        Welcome, {user.firstName} <SignOutButton size="sm" />
        {user.imageUrl && (
          <div class="avatar">
            <div class="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img src={user.imageUrl} alt={`${user.firstName}'s avatar`} />
            </div>
          </div>
        )}
      </div>
    )}
  </header>
);

const BrandLink: FC<JSX.HtmlAnchorTag> = ({ children, ...props }) => (
  <a class="btn btn-ghost" {...props}>
    <div class="avatar grid h-8 w-8 place-items-center rounded-full bg-secondary/80 p-1 ring ring-neutral">
      <img src="/icon.svg" alt="Bun ToDos" />
    </div>
    {children}
  </a>
);
