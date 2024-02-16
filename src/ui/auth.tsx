import { isEmpty } from "rambda";
import * as elements from "typed-html";

import { FC } from "~/lib/tw";

import { Button, ButtonProps } from "./components";

export const SignInButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button _="on click window.Clerk.openSignIn(this)" {...props}>
    {isEmpty(children) ? "Sign In" : children}
  </Button>
);

export const SignUpButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    variant="secondary"
    _="on click window.Clerk.openSignUp(this)"
    {...props}
  >
    {isEmpty(children) ? "Sign Up" : children}
  </Button>
);

export const SignOutButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    variant="secondary"
    _={`on click
      window.Clerk.signOut() 
      window.location.reload()`}
    {...props}
  >
    {isEmpty(children) ? "Sign Out" : children}
  </Button>
);
