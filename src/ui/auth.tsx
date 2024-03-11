import { isEmpty } from "rambda";
import * as elements from "typed-html";

import { FC } from "~/lib/tw";

import { Button, ButtonProps } from "./components";

export const SignInButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    _={`on click Clerk.openSignIn({ afterSignInUrl: '/app' })`}
    {...props}
  >
    {isEmpty(children) ? "Sign In" : children}
  </Button>
);

export const SignUpButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button variant="secondary" _="on click Clerk.openSignUp(this)" {...props}>
    {isEmpty(children) ? "Sign Up" : children}
  </Button>
);

export const SignOutButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    variant="secondary"
    _={`on click Clerk.signOut() location.reload()`}
    {...props}
  >
    {isEmpty(children) ? "Sign Out" : children}
  </Button>
);
