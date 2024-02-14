import * as elements from "typed-html";
import { FC, PropsWithChildren } from "~/lib/tw";
import { Clamp } from "./core";

type Props = PropsWithChildren<{}>;

const BrandLink: FC<JSX.HtmlAnchorTag> = ({ children, ...props }) => (
  <a class="btn btn-ghost" {...props}>
    <div class="avatar bg-error rounded-full h-6 w-6 grid place-items-center ring ring-neutral">
      🥟
    </div>
    {children}
  </a>
);

const Header: FC<JSX.HtmlTag> = (props) => (
  <header class="bg-base-200 navbar ring-1" {...props}>
    <Clamp class="navbar-start">
      <BrandLink href="/">Bun ToDo's</BrandLink>
    </Clamp>
  </header>
);

export default function Layout({ children }: Props) {
  return (
    <div class="min-h-[100dvh] flex flex-col gap-4">
      <Header />
      <main class="flex-1 flex">
        <Clamp class="container flex mx-auto flex-1">{children}</Clamp>
      </main>
    </div>
  );
}
