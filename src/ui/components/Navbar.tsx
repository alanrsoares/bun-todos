import tw, { ComponentProps } from "~/lib/tw";

const StyledNavbar = tw.div`
  navbar bg-base-100
  px-4 md:px-6
`;

export const Navbar = Object.assign(StyledNavbar, {
  Start: tw.div`navbar-start`,
  End: tw.div`navbar-end`,
  Center: tw.div`navbar-center`,
});

export type NavbarProps = ComponentProps<typeof StyledNavbar>;
