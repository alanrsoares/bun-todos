import * as elements from "typed-html";

import tw, { FC } from "~/lib/tw";
import Card from "~/ui/Card";
import { Button, Divider } from "~/ui/core";

const Container = tw.div`flex-1 flex items-center justify-center`;

const UnauthenticatedPage: FC = () => {
  return (
    <Container>
      <Card class="mx-auto w-full max-w-sm bg-base-200" responsive>
        <Card.Body class="space-y-4">
          <Card.Title>Welcome to Bun ToDos!</Card.Title>
          <div>
            <Button length="block" _="on click window.Clerk.openSignIn(this)">
              Sign In
            </Button>
            <Divider>or</Divider>
            <Button
              length="block"
              variant="secondary"
              _="on click window.Clerk.openSignUp(this)"
            >
              Sign Up
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UnauthenticatedPage;
