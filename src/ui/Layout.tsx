import * as elements from "typed-html";
import { FC, PropsWithChildren } from "~/types";
import { Clamp } from "./core";

type Props = PropsWithChildren<{}>;

const BrandLink: FC = ({ children, ...props }) => (
  <a class="btn btn-ghost" {...props}>
    <div class="avatar bg-error rounded-full h-6 w-6 grid place-items-center ring ring-neutral">
      🥟
    </div>
    {children}
  </a>
);

const Header: FC = () => (
  <header class="bg-base-200 navbar ring-1">
    <Clamp class="navbar-start">
      <BrandLink href="/">Bun ToDo's</BrandLink>
    </Clamp>
  </header>
);

export default function Layout({ children }: Props) {
  return (
    <div class="min-h-[100dvh] flex flex-col gap-4">
      <Header />
      <Clamp class="container mx-auto flex-1">
        <h1>Layout</h1>
        {children}
      </Clamp>
    </div>
  );
}
