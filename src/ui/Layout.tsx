import type { User } from "@clerk/backend";
import * as elements from "typed-html";

import { FC, PropsWithChildren } from "~/lib/tw";

import { Clamp } from "./core";

const BrandLink: FC<JSX.HtmlAnchorTag> = ({ children, ...props }) => (
  <a class="btn btn-ghost" {...props}>
    <div class="avatar grid h-6 w-6 place-items-center rounded-full bg-error ring ring-neutral">
      🥟
    </div>
    {children}
  </a>
);

const Header: FC<JSX.HtmlTag> = (props) => (
  <header class="navbar bg-base-200 ring-1" {...props}>
    <Clamp class="navbar-start">
      <BrandLink href="/">Bun ToDo's</BrandLink>
    </Clamp>
  </header>
);

type Props = PropsWithChildren<{
  user?: User;
}>;

export default function Layout({ children }: Props) {
  return (
    <div class="flex min-h-[100dvh] flex-col gap-4">
      <Header />
      <main class="flex flex-1">
        <Clamp class="container mx-auto flex flex-1">{children}</Clamp>
      </main>
    </div>
  );
}
